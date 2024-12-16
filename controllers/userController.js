const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao registrar usuário.');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send('Usuário não encontrado.');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send('Credenciais inválidas.');

    const token = jwt.sign({ id: user.id }, process.env.SESSION_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/process/my-processes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao fazer login.');
  }
};
