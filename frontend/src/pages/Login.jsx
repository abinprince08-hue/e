import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api.js';

function Login({ saveLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError('');

    try {
      const data = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      saveLogin(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <h1>Welcome back</h1>

      <label>
        Email
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>

      {error && <p className="error">{error}</p>}

      <button>Log in</button>
      <p>New here? <Link to="/register">Create an account</Link></p>
    </form>
  );
}

export default Login;
