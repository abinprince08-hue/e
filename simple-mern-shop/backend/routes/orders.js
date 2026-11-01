import express from 'express';
import { orders, products } from '../data.js';
import { checkLogin } from '../middleware/auth.js';
const router = express.Router();

router.post('/', checkLogin, (req, res) => {
  const { items, address } = req.body;
  if (!Array.isArray(items) || items.length === 0 || !address?.trim()) {
    return res.status(400).json({ message: 'Add items and enter a delivery address.' });
  }

  const orderItems = [];
  for (const item of items) {
    const product = products.find(p => p.id === Number(item.productId));
    const quantity = Number(item.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return res.status(400).json({ message: 'One of the cart items is not valid.' });
    }
    orderItems.push({ productId: product.id, name: product.name, price: product.price, quantity });
  }

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = { id: Date.now().toString(), userId: req.user.id, items: orderItems, address, total, date: new Date().toISOString() };
  orders.push(order);
  res.status(201).json({ message: 'Order placed successfully!', order });
});

router.get('/my-orders', checkLogin, (req, res) => {
  res.json(orders.filter(order => order.userId === req.user.id));
});
export default router;
