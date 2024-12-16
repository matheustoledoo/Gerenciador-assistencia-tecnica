// config/database.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      logging: false, // Desativar logs de SQL, se preferir
  }
);

sequelize.authenticate()
  .then(() => console.log('Conectado com sucesso ao banco de dados!'))
  .catch((error) => console.error('Erro ao conectar ao banco de dados:', error));

module.exports = { sequelize };