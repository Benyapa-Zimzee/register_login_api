import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!validator.isEmail(username)) {
        return res.status(400).json({ message: 'Please enter email address' });
      }
  
    try {
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      return res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!validator.isEmail(username)) {
    return res.status(400).json({ message: 'Please enter email address' });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;