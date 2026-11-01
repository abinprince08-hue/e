import express from 'express';
import { products } from '../data.js';
const router = express.Router();

router.get('/', (req, res) => {
  const search = (req.query.search || '').toLowerCase();
  const category = req.query.category || 'All';
  const result = products.filter(product =>
    product.name.toLowerCase().includes(search) && (category === 'All' || product.category === category)
  );
  res.json(result);
});

router.get('/:id', (req, res) => {
  const product = products.find(item => item.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found.' });
  res.json(product);
});
export default router;
