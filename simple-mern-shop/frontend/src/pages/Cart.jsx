import { Link } from 'react-router-dom';

function Cart({ cart, changeQuantity }) {
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].quantity;
  }

  if (cart.length === 0) {
    return (
      <div className="empty">
        <h1>Your cart is empty</h1>
        <Link to="/">Browse products</Link>
      </div>
    );
  }

  return (
    <section>
      <h1>Your cart</h1>

      {cart.map(item => (
        <div className="cart-row" key={item.id}>
          <img src={item.image} alt={item.name} />

          <div className="cart-name">
            <strong>{item.name}</strong>
            <small>₹{item.price.toLocaleString('en-IN')} each</small>
          </div>

          <input
            aria-label="Quantity"
            type="number"
            min="0"
            max="20"
            value={item.quantity}
            onChange={e => changeQuantity(item.id, e.target.value)}
          />

          <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
        </div>
      ))}

      <div className="cart-total">
        <h2>Total: ₹{total.toLocaleString('en-IN')}</h2>
        <Link className="button" to="/checkout">Continue to checkout</Link>
      </div>
    </section>
  );
}

export default Cart;
