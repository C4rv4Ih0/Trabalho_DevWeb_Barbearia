const express = require('express');
const router = express.Router();
const { Horario, sequelize } = require('../models');
const { Op } = require('sequelize');

router.get('/horarios-disponiveis/:data', async (req, res) => {
  const data = req.params.data;
  console.log(data);

  try{
    const query = `SELECT * FROM "Horarios" WHERE id NOT IN (SELECT "horaId" FROM "Agendamentos" WHERE DATE(data) = '${data}');`;

    const horariosDisponiveis = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    })

    if(!horariosDisponiveis || horariosDisponiveis.length === 0){
      res.status(404).json({ error: 'Nenhum horário disponível para a data informada' });
      return;
    }else{
      res.status(200).json(horariosDisponiveis);
    }

  }catch(error){
      res.status(500).json({erro: error.message});
  }
});

router.get('/horarios', async (req, res) => {
  try{
    const horarios = await Horario.findAll();
    res.status(200).json(horarios);
  }catch(error){
    res.status(500).json({erro: "Ocorreu um erro"});
  }
});

router.get('/horarios/:id', async (req, res) => {
  const { id } = req.params;
  try{
    const horario = await Horario.findByPk(id);
    res.status(200).json(horario);
  }catch(error){
    res.status(500).json({erro: "Ocorreu um erro"});
  }
});
  
router.post('/horarios', async (req, res) => {
  try{
    const horario = await Horario.create(req.body);
    res.json(horario);
  }catch(error){
    res.status(500).json({erro: "Ocorreu um erro"});
  }
});
  
router.put('/horarios/:id', async (req, res) => {
    const { id } = req.params;
    const horario = await Horario.findByPk(id);
    if (horario) {
      try{
        await horario.update(req.body);
        res.json(horario);
      }catch(error){
        res.status(500).json({erro: "Ocorreu um erro"});
      }
    } else {
      res.status(404).json({ error: 'Horário não encontrado' });
    }
});
  
router.delete('/horarios/:id', async (req, res) => {
    const { id } = req.params;
    const horario = await Horario.findByPk(id);
    if (horario) {
      try{
        await horario.destroy();
        res.json({ message: 'Horário excluído com sucesso' });
      }catch(error){
        res.status(500).json({erro: "Ocorreu um erro"});
      }
    } else {
      res.status(404).json({ error: 'Horário não encontrado' });
    }
});
  
router.delete('/horarios', async (req, res) => {
  try{
    await Horario.destroy({ where: {}, truncate: true });
    res.json({ message: 'Todos os horários foram excluídos com sucesso' });
  }catch(error){
    res.status(500).json({erro: "Ocorreu um erro"});
  }
});

module.exports = router;