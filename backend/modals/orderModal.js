import mongoose from "mongoose";

// Sub-schema for individual items within an order
const orderItemSchema = new mongoose.Schema({
    item: {
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        imgUrl: { type: String, required: true }
    },
    quantity: { type: Number, required: true, min: 1 },
}, { _id: true });

// Main Order Schema
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true // Added required for data integrity
    },
    email: { type: String, required: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },

    // Order items array
    items: [orderItemSchema],

    // Payment details
    paymentMethod: { 
        type: String, 
        required: true, 
        enum: ["Credit Card", "online", "Upi", "PayPal", "Cash on Delivery"],
        index: true
    },
    paymentIntentId: { type: String },
    sessionId: { type: String },
    transactionId: { type: String },
    paymentStatus: { 
        type: String, 
        required: true, 
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
        index: true
    },

    // Order calculations
    subtotal: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0 },
    shippingFee: { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },

    // Order tracking details
    status: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Processing",
        index: true
    },
    expectedDeliveryDate: Date,
    deliveredAt: Date, // Fixed typo: 'deliverdAt' -> 'deliveredAt'
}, {
    // Built-in timestamps handle createdAt and updatedAt automatically
    timestamps: true 
});

// Compound Indexes for optimized searching/sorting
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, paymentStatus: 1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;