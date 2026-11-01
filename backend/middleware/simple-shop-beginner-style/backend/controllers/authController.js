import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, addUser } from '../models/userModel.js';

function makeToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (findUserByEmail(cleanEmail)) {
      return res.status(409).json({ message: 'This email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: Date.now().toString(),
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword
    };

    addUser(user);

    const token = makeToken(user);

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Could not create the account.' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const cleanEmail = (email || '').toLowerCase().trim();
    const user = findUserByEmail(cleanEmail);

    if (!user || !(await bcrypt.compare(password || '', user.password))) {
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    }

    const token = makeToken(user);

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Could not log in.' });
  }
}
