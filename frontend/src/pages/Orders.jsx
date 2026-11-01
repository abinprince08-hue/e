import { useEffect, useState } from 'react';
import { api } from '../api.js';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      const data = await api('/api/orders/my-orders');
      setOrders(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section>
      <h1>My orders</h1>

      {error && <p className="error">{error}</p>}

      {orders.length === 0 && !error && <p>You haven't placed an order yet.</p>}

      {orders.map(order => (
        <article className="order-card" key={order.id}>
          <div>
            <strong>Order #{order.id.slice(-6)}</strong>
            <small>{new Date(order.date).toLocaleString()}</small>
          </div>

          <p>
            {order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}
          </p>

          <strong>₹{order.total.toLocaleString('en-IN')}</strong>
          <small>Deliver to: {order.address}</small>
        </article>
      ))}
    </section>
  );
}

export default Orders;
