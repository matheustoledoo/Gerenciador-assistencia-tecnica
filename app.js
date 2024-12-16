// app.js
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Importa o Sequelize Store
const dotenv = require('dotenv');
const { sequelize } = require('./config/database');
const moment = require('moment');

process.env.NODE_ENV = 'production';



// Configuração de variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// Configuração do armazenamento de sessões no banco de dados
const sessionStore = new SequelizeStore({
    db: sequelize, // Usa a conexão do Sequelize configurada
  });
  
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secret_key', // Chave secreta da sessão
      store: sessionStore, // Armazena sessões no banco
      resave: false,
      saveUninitialized: false, // Apenas salva sessões se houver dados
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 dia
      },
    })
  );

  // Sincronizar a tabela de sessões com o banco de dados
sessionStore.sync();

// Registro de helpers do Handlebars
const hbs = exphbs.create({
  helpers: {
    formatDate: (date) => {
      if (!date) return ''; // Retorna vazio se a data for nula
      return moment(date).format('DD/MM/YYYY'); // Formato brasileiro
    },
    eq: (a, b) => a === b, // Helper para igualdade
  },
});

// Configuração do Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Definir se o usuário está autenticado
app.use((req, res, next) => {
  const token = req.cookies.token;
  res.locals.isAuthenticated = !!token;
  next();
});

// Arquivos estáticos
app.use(express.static('public'));

// Rotas
const authRoutes = require('./routes/authRoutes');
const processRoutes = require('./routes/processRoutes');

app.use('/auth', authRoutes);
app.use('/process', processRoutes);

// Home route
app.get('/', (req, res) => {
  res.redirect('/process'); // Redireciona para a rota onde os processos estão sendo exibidos
});

// Conexão com o banco e início do servidor
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });