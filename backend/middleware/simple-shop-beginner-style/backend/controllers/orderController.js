import { getAllProducts } from '../models/productModel.js';
import { addOrder, getOrdersByUser } from '../models/orderModel.js';
import { clearCart } from '../models/cartModel.js';

export function placeOrder(req, res) {
  const { items, address } = req.body;

  if (!Array.isArray(items) || items.length === 0 || !address?.trim()) {
    return res.status(400).json({ message: 'Add items and enter a delivery address.' });
  }

  const orderItems = [];

  for (const item of items) {
    const product = getAllProducts().find(p => p.id === Number(item.productId));
    const quantity = Number(item.quantity);

    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return res.status(400).json({ message: 'One of the cart items is not valid.' });
    }

    orderItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity
    });
  }

  const total = orderItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const order = {
    id: Date.now().toString(),
    userId: req.user.id,
    items: orderItems,
    address: address.trim(),
    total,
    date: new Date().toISOString()
  };

  addOrder(order);
  clearCart(req.user.id);

  res.status(201).json({ message: 'Order placed successfully!', order });
}

export function getMyOrders(req, res) {
  res.json(getOrdersByUser(req.user.id));
}
