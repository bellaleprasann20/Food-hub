import express from 'express';
// Added deleteCartItem to the imports below
import { 
    getCartItems, 
    addToCart, 
    updateCartItem, 
    clearCart, 
    deleteCartItem 
} from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Routes for /api/cart (or whatever prefix you used in server.js)
router.route('/')
    .get(authMiddleware, getCartItems)
    .post(authMiddleware, addToCart);

// Route to clear the entire cart
router.post('/clear', authMiddleware, clearCart);

// Routes for specific cart items by ID
router.route('/:id')
    .put(authMiddleware, updateCartItem)
    .delete(authMiddleware, deleteCartItem);

export default router;