// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

// Middleware for protected routes
function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token, process.env.SESSION_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user;
        next();
    });
}

// Rota para exibir a página de login
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Rota para exibir a página de registro
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).send('Email already registered');

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Redirect to login after successful registration
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Login a user
// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).send('User not found');

      // Compare password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).send('Invalid credentials');

      // Debugging the SESSION_SECRET
      console.log("SESSION_SECRET:", process.env.SESSION_SECRET);

      // Generate token
      const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.SESSION_SECRET,
          { expiresIn: '1h' }
      );

      // Send token as cookie
      res.cookie('token', token, { httpOnly: true });

      // Redirect to the main page after login
      res.redirect('/');
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

// Logout a user
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
});

module.exports = router;
module.exports.authenticateToken = authenticateToken;
