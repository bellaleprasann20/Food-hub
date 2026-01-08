import express from 'express';
import { 
    getAllOrders, 
    updateAnyOrder, 
    getOrderById, 
    updateOrderById, 
    createOrder, 
    getOrder,
    confirmOrderPayment 
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

// Public routes (admin routes - should add admin middleware)
orderRouter.get('/getall', getAllOrders);
orderRouter.put('/getall/:id', updateAnyOrder);

// Protected routes (require authentication)
orderRouter.use(authMiddleware);

orderRouter.post('/', createOrder);
orderRouter.get('/', getOrder);
orderRouter.put('/confirm', confirmOrderPayment);
orderRouter.get('/:id', getOrderById);
orderRouter.put('/:id', updateOrderById);

export default orderRouter;