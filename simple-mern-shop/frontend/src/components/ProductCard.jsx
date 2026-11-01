import { Link } from 'react-router-dom';

function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <small>{product.category}</small>
          <h3>{product.name}</h3>
          <strong>₹{product.price.toLocaleString('en-IN')}</strong>
        </div>
      </Link>

      <button onClick={() => addToCart(product)}>Add to cart</button>
    </article>
  );
}

export default ProductCard;
