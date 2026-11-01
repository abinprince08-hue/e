import { useEffect, useState } from 'react';
import { api } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts();
  }, [search, category]);

  async function getProducts() {
    try {
      setError('');
      const data = await api(
        `/api/products?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`
      );
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <section className="hero">
        <p className="eyebrow">A little bit of everything</p>
        <h1>Find something<br />you'll love.</h1>
        <p>Simple finds for everyday life.</p>
      </section>

      <div className="shop-tools">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
        />

        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>All</option>
          <option>Accessories</option>
          <option>Footwear</option>
          <option>Electronics</option>
          <option>Home</option>
        </select>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      {products.length === 0 && !error && <p>No products found. Try another search.</p>}
    </>
  );
}

export default Home;
