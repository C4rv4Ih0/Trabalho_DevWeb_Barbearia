const express = require('express');
const router = express.Router();
const { Funcionario } = require('../models');

router.get('/funcionarios', async (req, res) => {
  try{
    const funcionarios = await Funcionario.findAll();
    res.status(200).json(funcionarios);
  }catch(error){
    res.status(500).json({erro: "Ocorreu um erro"});
  }
});

router.get('/funcionarios/:id', async (req, res) => {
  const { id } = req.params;
  try{
    const funcionario = await Funcionario.findByPk(id);
    res.status(200).json(funcionario);
  }catch(error){
    res.status(500).json({erro: "Ocorreu um erro"});
  }
});
  
router.post('/funcionarios', async (req, res) => {
  try{
    const funcionario = await Funcionario.create(req.body);
    res.status(200).json(funcionario);
  }catch(error){
    res.status(500).json({erro: "Ocorreu um erro"});
  }
});
  
router.put('/funcionarios/:id', async (req, res) => {
    const { id } = req.params;
    const funcionario = await Funcionario.findByPk(id);
    if (funcionario) {
      try{
        await funcionario.update(req.body);
        res.json(funcionario);
      }catch(error){
        res.status(500).json({erro: "Ocorreu um erro"});
      }
    } else {
      res.status(404).json({ error: 'Funcionário não encontrado' });
    }
});
  
router.delete('/funcionarios/:id', async (req, res) => {
    const { id } = req.params;
    const funcionario = await Funcionario.findByPk(id);
    if (funcionario) {
      try{
        await funcionario.destroy();
        res.json({ message: 'Funcionário excluído com sucesso' });
      }catch(error){
        res.status(500).json({erro: "Ocorreu um erro"});
      }
    } else {
      res.status(404).json({ error: 'Funcionário não encontrado' });
    }
});
  
router.delete('/funcionarios', async (req, res) => {
  try{
    await Funcionario.destroy({ where: {}, truncate: true });
    res.json({ message: 'Todos os funcionários foram excluídos com sucesso' });
  }catch(error){
    res.status(500).json({erro: "Ocorreu um erro"});
  }
});

module.exports = router;