import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../data.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Please fill in all fields.' });
  if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  if (users.some(user => user.email === email.toLowerCase())) return res.status(409).json({ message: 'This email is already registered.' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), name, email: email.toLowerCase(), password: hashedPassword };
  users.push(user);
  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(item => item.email === email?.toLowerCase());
  if (!user || !(await bcrypt.compare(password || '', user.password))) {
    return res.status(401).json({ message: 'Email or password is incorrect.' });
  }
  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

export default router;
