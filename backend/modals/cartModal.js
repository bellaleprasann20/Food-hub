import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true 
    },
    itemId: { 
        // We use ObjectId to create a relationship between the Cart and the Items collection
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Item', // CRITICAL: This must match the name in mongoose.model("Item", ...)
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        default: 1,
        min: [1, "Quantity cannot be less than 1"] 
    }
}, { timestamps: true });

// Check if the model already exists in the Mongoose connection to avoid errors during hot-reloads
const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;