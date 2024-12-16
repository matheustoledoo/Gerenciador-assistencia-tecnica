const Process = require('../models/Process');

exports.getAllProcesses = async (req, res) => {
  try {
    const processes = await Process.findAll();
    res.render('home', { processes });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao carregar processos.');
  }
};

exports.createProcess = async (req, res) => {
  try {
    await Process.create(req.body);
    res.redirect('/process');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar processo.');
  }
};
