import asyncHandler from 'express-async-handler';
import Cart from '../modals/cartModal.js';

// @desc    Get cart items
// @route   GET /api/cart
export const getCartItems = asyncHandler(async (req, res) => {
    // FIX: Changed .populate('item') to .populate('itemId')
    const items = await Cart.find({ userId: req.user.id }).populate('itemId');

    const formatted = items.map(ci => ({
        _id: ci._id.toString(),
        item: ci.itemId, // This now contains the full item details from the Item model
        quantity: ci.quantity
    }));
    res.json(formatted);
});

// @desc    Add item to cart
// @route   POST /api/cart
export const addToCart = asyncHandler(async (req, res) => {
    const { itemId, quantity } = req.body; 
    
    if(!itemId || typeof quantity !== 'number' ){
        res.status(400);
        throw new Error("Item ID and quantity are required");
    }

    let existingItem = await Cart.findOne({ userId: req.user.id, itemId });

    if (existingItem) {
        existingItem.quantity = Math.max(1, existingItem.quantity + quantity);
        await existingItem.save();
        await existingItem.populate('itemId'); // Corrected path
        
        return res.status(200).json({
            _id: existingItem._id.toString(), 
            item: existingItem.itemId, 
            quantity: existingItem.quantity
        });
    }   

    const newItem = await Cart.create({
        userId: req.user.id,
        itemId: itemId,
        quantity: quantity,
    });

    await newItem.populate('itemId'); // Corrected path
    res.status(201).json({
        _id: newItem._id.toString(), 
        item: newItem.itemId, 
        quantity: newItem.quantity
    });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
export const updateCartItem = asyncHandler(async (req, res) => {
    const { quantity } = req.body;

    const itemToUpdate = await Cart.findOne({ userId: req.user.id, _id: req.params.id });
    
    if (!itemToUpdate) {
        res.status(404);
        throw new Error("Cart item not found");
    }

    // Business Logic: If updated quantity is less than 1, you might want to delete it,
    // otherwise Math.max(1, quantity) keeps it at minimum 1.
    itemToUpdate.quantity = Math.max(1, quantity);
    await itemToUpdate.save();
    
    // FIX: Changed .populate('item') to .populate('itemId')
    await itemToUpdate.populate('itemId');
    
    res.json({
        _id: itemToUpdate._id.toString(), 
        item: itemToUpdate.itemId, // Mapping correctly to the populated field
        quantity: itemToUpdate.quantity
    });
});

// @desc    Delete cart item
// @route   DELETE /api/cart/:id
export const deleteCartItem = asyncHandler(async (req, res) => {
    const itemToDelete = await Cart.findOne({ userId: req.user.id, _id: req.params.id });
    
    if (!itemToDelete) {
        res.status(404);
        throw new Error("Cart item not found");
    }

    await itemToDelete.deleteOne();
    res.json({ _id: req.params.id, message: "Item removed" });
});

// @desc    Clear entire cart
// @route   POST /api/cart/clear
export const clearCart = asyncHandler(async (req, res) => {
    await Cart.deleteMany({ userId: req.user.id });
    res.json({ message: "Cart cleared" });
});