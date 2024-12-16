// models/Process.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Process = sequelize.define('Process', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  numeroProcesso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  acao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  forum: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vara: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ripa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailVara: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  telefoneVara: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  requerente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  advogadoRequerente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefoneRequerente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailRequerente: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  requerido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  advogadoRequerido: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefoneRequerido: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailRequerido: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  perito: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefonePerito: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailPerito: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  assistenteTecnico: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefoneAssistenteTecnico: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailAssistenteTecnico: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  nomeacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dataNomeacao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  valortotal: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  medidoateomomento: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  saldoamedir: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  medicaoatual: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  agendamentoVistoria: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dataVistoria: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  laudoNaoIniciado: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  motivoNaoIniciado: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dataNaoIniciado: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  laudoIniciado: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  conclusaoLaudo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dataConclusao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  laudoParalisado: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  motivoParalisado: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dataParalisado: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  esclarecimentosNaoIniciado: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  motivoNaoIniciadoEsclarecimentos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dataNaoIniciadoEsclarecimentos: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  esclarecimentosIniciado: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  conclusaoEsclarecimentos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dataConclusaoEsclarecimentos: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  esclarecimentosParalisado: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  motivoParalisadoEsclarecimentos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dataParalisadoEsclarecimentos: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'processes',
  timestamps: true, // Adds createdAt and updatedAt columns
});

// Relationships
Process.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Process, { foreignKey: 'userId', as: 'processes' });

module.exports = Process;