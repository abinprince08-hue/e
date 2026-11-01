import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';

function Checkout({ cart, setCart }) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].quantity;
  }

  async function placeOrder(e) {
    e.preventDefault();
    setError('');

    try {
      await api('/api/orders', {
        method: 'POST',
        body: JSON.stringify({
          address,
          items: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity
          }))
        })
      });

      setCart([]);
      navigate('/orders');
    } catch (err) {
      setError(err.message);
    }
  }

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <form className="auth-form" onSubmit={placeOrder}>
      <h1>Checkout</h1>
      <p>Order total: <strong>₹{total.toLocaleString('en-IN')}</strong></p>

      <label>
        Delivery address
        <textarea
          required
          value={address}
          onChange={e => setAddress(e.target.value)}
          rows="4"
        />
      </label>

      {error && <p className="error">{error}</p>}

      <button>Place order</button>
      <small>This demo does not take real payments.</small>
    </form>
  );
}

export default Checkout;
