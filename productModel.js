// Temporary product data. This replaces MongoDB for this task.

const products = [
  { id: 1, name: 'Everyday Backpack', category: 'Accessories', price: 899, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700', description: 'A simple backpack for everyday use.' },
  { id: 2, name: 'Classic Sneakers', category: 'Footwear', price: 1499, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700', description: 'Comfortable sneakers for daily wear.' },
  { id: 3, name: 'Wireless Headphones', category: 'Electronics', price: 1999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700', description: 'Wireless headphones for music and calls.' },
  { id: 4, name: 'Minimal Watch', category: 'Accessories', price: 1299, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700', description: 'A clean, minimal everyday watch.' },
  { id: 5, name: 'Desk Lamp', category: 'Home', price: 799, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700', description: 'A useful lamp for your study desk.' },
  { id: 6, name: 'Water Bottle', category: 'Home', price: 399, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700', description: 'A reusable bottle to carry around.' }
];

export function getAllProducts() {
  return products;
}

export function getProductById(id) {
  return products.find(product => product.id === Number(id));
}
