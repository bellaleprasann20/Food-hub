import Razorpay from 'razorpay';
import Order from '../modals/orderModal.js';
import 'dotenv/config';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Order function
export const createOrder = async (req, res) => {
    try {
        const { firstName, lastName, email, address, city, zipCode, items, paymentMethod, subtotal, tax, shippingFee, totalAmount } = req.body;

        // Check if user is authenticated
        const userId = req.user?._id || req.user?.id;
        
        if (!userId) {
            console.error("Authentication failed - req.user:", req.user);
            return res.status(401).json({ message: "User not authenticated." });
        }

        // Validate items array
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Invalid or empty items array." });
        }

        // Map order items
        const orderItems = items.map(({ item, name, quantity, price, imgUrl }) => {
            const base = item || {};
            return {
                item: {
                    name: base.name || name || "Unknown Item",
                    price: Number(base.price ?? price) || 0,
                    imgUrl: base.imgUrl || imgUrl || ""
                },
                quantity: Number(quantity) || 0
            };
        });

        // Default shipping fee
        const shippingCost = shippingFee || 0;
        let newOrder;

        if (paymentMethod === "online" || paymentMethod === "Online") {
            // Create Razorpay checkout session
            const session = await razorpay.orders.create({
                amount: Math.round(totalAmount * 100), // Amount in paise
                currency: 'INR',
                receipt: `order_${Date.now()}`,
                notes: {
                    firstName,
                    lastName,
                    email,
                    address,
                    city,
                    zipCode
                }
            });

            newOrder = new Order({
                user: userId,
                firstName,
                lastName,
                email,
                address,
                city,
                zipCode,
                paymentMethod: "Online", // Try capitalized
                subtotal,
                tax,
                shippingFee: shippingCost,
                totalAmount,
                items: orderItems,
                sessionId: session.id,
                paymentStatus: "Pending" // Try capitalized
            });

            await newOrder.save();
            return res.status(201).json({ order: newOrder, checkoutUrl: session.id });
        }

        // Cash on Delivery order
        newOrder = new Order({
            user: userId,
            firstName,
            lastName,
            email,
            address,
            city,
            zipCode,
            paymentMethod: "Cash on Delivery", // Try uppercase
            subtotal,
            tax,
            shippingFee: shippingCost,
            totalAmount,
            items: orderItems,
            paymentStatus: "Completed" // Try Completed instead of Successful
        });

        await newOrder.save();
        return res.status(201).json({ order: newOrder, checkoutUrl: null });

    } catch (error) {
        console.error("createOrder error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Confirm order payment
export const confirmOrderPayment = async (req, res) => {
    try {
        const { session_id } = req.query;
        
        if (!session_id) {
            return res.status(400).json({ message: "session_id required." });
        }

        // Verify payment with Razorpay
        const payment = await razorpay.orders.fetch(session_id);
        
        if (payment.status === "paid") {
            const order = await Order.findOneAndUpdate(
                { sessionId: session_id },
                { paymentStatus: "successful" },
                { new: true }
            );

            if (!order) {
                return res.status(404).json({ message: "Order not found." });
            }
            
            return res.json({ order });
        }
        
        return res.status(400).json({ message: "Payment not completed." });
        
    } catch (error) {
        console.error("confirmOrderPayment error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Get user orders
export const getOrder = async (req, res) => {
    try {
        const filter = { user: req.user._id };
        const rawOrders = await Order.find(filter).sort({ createdAt: -1 }).lean();

        // Format orders
        const formatted = rawOrders.map(order => ({
            ...order,
            items: order.items.map(i => ({
                _id: i._id,
                item: i.item,
                quantity: i.quantity
            })),
            createdAt: order.createdAt,
            paymentStatus: order.paymentStatus
        }));

        res.json({ formatted });
    } catch (error) {
        console.error("getOrder error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Admin get all orders
export const getAllOrders = async (req, res) => {
    try {
        const rawOrders = await Order.find({}).sort({ createdAt: -1 }).lean();

        const formatted = rawOrders.map(order => ({
            _id: order._id,
            user: order.user,
            firstName: order.firstName,
            lastName: order.lastName,
            email: order.email,
            address: order.address ?? order.shippingAddress ?? '',
            city: order.city ?? order.shippingCity ?? '',
            phone: order.phone,
            zipCode: order.zipCode ?? order.shippingZipCode ?? '',
            paymentMethod: order.paymentMethod,
            paymentStatus: order.paymentStatus,
            status: order.status,
            createdAt: order.createdAt,
            items: order.items.map(i => ({
                _id: i._id,
                item: i.item,
                quantity: i.quantity
            }))
        }));

        res.json({ formatted });
    } catch (error) {
        console.error("getAllOrders error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Update order status by admin
export const updateAnyOrder = async (req, res) => {
    try {
        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.json({ updated });
    } catch (error) {
        console.error("updateAnyOrder error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Get order by id
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        if (!order.user.equals(req.user._id)) {
            return res.status(403).json({ message: "Access denied." });
        }

        if (req.query.email && order.email !== req.query.email) {
            return res.status(403).json({ message: "Access denied." });
        }

        return res.json({ order });
    } catch (error) {
        console.error("getOrderById error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Update order by id
export const updateOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        if (!order.user.equals(req.user._id)) {
            return res.status(403).json({ message: "Access denied." });
        }

        if (req.body.email && order.email !== req.body.email) {
            return res.status(403).json({ message: "Access denied." });
        }

        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({ updated });
    } catch (error) {
        console.error("updateOrderById error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};