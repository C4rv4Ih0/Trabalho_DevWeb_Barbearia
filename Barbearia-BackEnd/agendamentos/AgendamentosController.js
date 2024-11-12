const express = require('express');
const router = express.Router();
const { Agendamento, Funcionario, TipoCorte, Horario } = require('../models');

router.get('/agendamentos', async (req, res) => {
  try{
    const agendamentos = await Agendamento.findAll({
      include: [
        {model: Funcionario, as: 'funcionario'},
        {model: TipoCorte, as: 'tipoDeCorte'},
        {model: Horario, as: 'hora'}
      ],
    });
    res.json(agendamentos);
  }catch(error){
    res.status(500).json({ erro: 'Ocorreu um erro' });
  }
});

router.get('/agendamentos/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const agendamento = await Agendamento.findByPk(id, {
      include: [
        {model: Funcionario, as: 'funcionario'},
        {model: TipoCorte, as: 'tipoDeCorte'},
        {model: Horario, as: 'hora'}
      ],
    });
    if (agendamento) {
      res.json(agendamento);
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  }catch(error){
    res.status(500).json({ erro: 'Ocorreu um erro' });
  }
});

router.get('/agendamentos-com-detalhes', async(req, res) => {
  try{
    const agendamentos = await Agendamento.findAll({
      include: [
        {model: Funcionario, as: 'funcionario'},
        {model: TipoCorte, as: 'tipoDeCorte'},
        {model: Horario, as: 'hora'}
      ],
      order: [['data', 'ASC']],
    });

    console.log(agendamentos);
    res.status(200).json(agendamentos);
  }catch(error){
    res.status(500).json({ erro: error.message });
  }
})

router.post('/agendamentos', async (req, res) => {
  try{
    const agendamento = await Agendamento.create(req.body);
    res.json(agendamento);
  }catch(error){
    res.status(500).json({ erro: error });
  } 
});

router.put('/agendamentos/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const agendamento = await Agendamento.findByPk(id);
    if (agendamento) {
      await agendamento.update(req.body);
      res.json(agendamento);
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  }catch(error){
    res.status(500).json({ erro: 'Ocorreu um erro' });
  }
});

router.delete('/agendamentos/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const agendamento = await Agendamento.findByPk(id);
    if (agendamento) {
      await agendamento.destroy();
      res.json({ message: 'Agendamento excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  }catch(error){
    res.status(500).json({ erro: 'Ocorreu um erro' });
  }
});

router.delete('/agendamentos', async (req, res) => {
  try{
    await Agendamento.destroy({ where: {}, truncate: true });
    res.json({ message: 'Todos os agendamentos foram excluídos com sucesso' });
  }catch(error){
    res.status(500).json({ erro: 'Ocorreu um erro' });
  }
});

module.exports = router;