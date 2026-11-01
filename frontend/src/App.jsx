import { useState, useEffect } from 'react';
import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';

function App() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('shopCart') || '[]')
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('shopUser') || 'null')
  );
  const navigate = useNavigate();

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem('shopCart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    let newCart = [...cart];
    let found = false;

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === product.id) {
        newCart[i].quantity = newCart[i].quantity + 1;
        found = true;
      }
    }

    if (!found) {
      newCart.push({ ...product, quantity: 1 });
    }

    setCart(newCart);
  }

  function changeQuantity(id, quantity) {
    let newCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Number(quantity) };
      }
      return item;
    });

    newCart = newCart.filter(item => item.quantity > 0);
    setCart(newCart);
  }

  function saveLogin(data) {
    localStorage.setItem('shopToken', data.token);
    localStorage.setItem('shopUser', JSON.stringify(data.user));
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem('shopToken');
    localStorage.removeItem('shopUser');
    setUser(null);
    navigate('/');
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <header className="navbar">
        <Link className="brand" to="/">simple<span>shop</span></Link>

        <nav>
          <Link to="/">Products</Link>
          <Link to="/cart">Cart ({cartCount})</Link>

          {user ? (
            <>
              <Link to="/orders">My orders</Link>
              <button className="link-button" onClick={logout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign up</Link>
            </>
          )}
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/product/:id" element={<Product addToCart={addToCart} />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login saveLogin={saveLogin} />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register saveLogin={saveLogin} />} />
          <Route path="/cart" element={<Cart cart={cart} changeQuantity={changeQuantity} />} />
          <Route path="/checkout" element={user ? <Checkout cart={cart} setCart={setCart} /> : <Navigate to="/login" />} />
          <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      <footer>Simple Shop · A beginner-friendly demo project</footer>
    </div>
  );
}

export default App;
