import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api.js';

function Register({ saveLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError('');

    try {
      const data = await api('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });

      saveLogin(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleRegister}>
      <h1>Create account</h1>

      <label>
        Name
        <input
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>

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
          minLength="6"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>

      {error && <p className="error">{error}</p>}

      <button>Create account</button>
      <p>Already registered? <Link to="/login">Log in</Link></p>
    </form>
  );
}

export default Register;
