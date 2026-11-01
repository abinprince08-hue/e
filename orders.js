import express from 'express';
import { checkLogin } from '../middleware/auth.js';
import { placeOrder, getMyOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', checkLogin, placeOrder);
router.get('/my-orders', checkLogin, getMyOrders);

export default router;
