import { getAllProducts, getProductById } from '../models/productModel.js';

export function getProducts(req, res) {
  const search = (req.query.search || '').toLowerCase();
  const category = req.query.category || 'All';

  const result = getAllProducts().filter(product => {
    const nameMatches = product.name.toLowerCase().includes(search);
    const categoryMatches = category === 'All' || product.category === category;
    return nameMatches && categoryMatches;
  });

  res.json(result);
}

export function getProduct(req, res) {
  const product = getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  res.json(product);
}
