import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api.js';

function Product({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getProduct();
  }, [id]);

  async function getProduct() {
    try {
      const data = await api(`/api/products/${id}`);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div className="detail-layout">
      <img src={product.image} alt={product.name} />
      <div>
        <small>{product.category}</small>
        <h1>{product.name}</h1>
        <h2>₹{product.price.toLocaleString('en-IN')}</h2>
        <p>{product.description}</p>
        <button onClick={() => addToCart(product)}>Add to cart</button>
      </div>
    </div>
  );
}

export default Product;
