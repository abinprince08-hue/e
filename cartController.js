import { getCart, saveCart } from '../models/cartModel.js';
import { getProductById } from '../models/productModel.js';

export function getMyCart(req, res) {
  res.json(getCart(req.user.id));
}

export function addToCart(req, res) {
  const { productId, quantity } = req.body;
  const product = getProductById(productId);
  const amount = Number(quantity || 1);

  if (!product || !Number.isInteger(amount) || amount < 1 || amount > 20) {
    return res.status(400).json({ message: 'Please select a valid product and quantity.' });
  }

  const cart = getCart(req.user.id);
  const item = cart.find(row => row.productId === product.id);

  if (item) {
    item.quantity += amount;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: amount
    });
  }

  res.json(saveCart(req.user.id, cart));
}

export function updateCartItem(req, res) {
  const quantity = Number(req.body.quantity);
  const productId = Number(req.params.productId);

  if (!Number.isInteger(quantity) || quantity < 0 || quantity > 20) {
    return res.status(400).json({ message: 'Quantity must be between 0 and 20.' });
  }

  let cart = getCart(req.user.id);

  if (quantity === 0) {
    cart = cart.filter(item => item.productId !== productId);
  } else {
    cart = cart.map(item => {
      if (item.productId === productId) {
        return { ...item, quantity };
      }
      return item;
    });
  }

  res.json(saveCart(req.user.id, cart));
}

export function removeFromCart(req, res) {
  const productId = Number(req.params.productId);
  const cart = getCart(req.user.id).filter(item => item.productId !== productId);
  res.json(saveCart(req.user.id, cart));
}
