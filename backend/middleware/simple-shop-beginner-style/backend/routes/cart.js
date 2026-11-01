import express from 'express';
import { checkLogin } from '../middleware/auth.js';
import {
  getMyCart,
  addToCart,
  updateCartItem,
  removeFromCart
} from '../controllers/cartController.js';

const router = express.Router();

router.get('/', checkLogin, getMyCart);
router.post('/', checkLogin, addToCart);
router.put('/:productId', checkLogin, updateCartItem);
router.delete('/:productId', checkLogin, removeFromCart);

export default router;
