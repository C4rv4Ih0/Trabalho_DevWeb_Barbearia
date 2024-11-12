const express = require('express');
const router = express.Router();
const { TipoCorte } = require('../models');

router.get('/tipos-corte', async (req, res) => {
  try{
    const tiposCorte = await TipoCorte.findAll();
    res.status(200).json(tiposCorte);
  }catch(error){
    res.status(500).json({erro: "Ocorreu um erro"});
  }
});
  
router.post('/tipos-corte', async (req, res) => {
  try{
    const tipoCorte = await TipoCorte.create(req.body);
    res.json(tipoCorte);
  }catch(error){
    res.status(500).json({erro: "Ocorreu um erro"});
  }
});
  
router.put('/tipos-corte/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const tipoCorte = await TipoCorte.findByPk(id);
    if (tipoCorte) {
      await tipoCorte.update(req.body);
      res.json(tipoCorte);
    } else {
      res.status(404).json({ error: 'Tipo de corte não encontrado' });
    }
  }catch(error){
    res.status(500).json({erro: "Ocorreu um erro"});
  }
});
  
router.delete('/tipos-corte/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const tipoCorte = await TipoCorte.findByPk(id);
    if (tipoCorte) {
      await tipoCorte.destroy();
      res.json({ message: 'Tipo de corte excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Tipo de corte não encontrado' });
    }
  }catch(error){
    res.status(500).json({erro: "Ocorreu um erro"});
  }
});
  
router.delete('/tipos-corte', async (req, res) => {
  try{
    await TipoCorte.destroy({ where: {}, truncate: true });
    res.json({ message: 'Todos os tipos de corte foram excluídos com sucesso' });
  }catch(error){
    res.status(500).json({erro: "Ocorreu um erro"});
  }
});

module.exports = router;