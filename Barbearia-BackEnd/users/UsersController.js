const express = require('express');
const { User } = require('../models');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userAuth = require('../middlewares/userAuth');
const bcrypt = require('bcryptjs');

const SECRET_KEY = "qualquercoisa";

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
}

router.post("/authenticate", async (req, res) => {
    const { email, senha } = req.body;
    
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }
  
      const senhaCorreta = bcrypt.compareSync(senha, user.senha);
  
      if (!senhaCorreta) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }
  
      const token = generateToken(user);
      res.status(200).json({ authenticated: true, token });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao autenticar o usuário' });
    }
});
  
  router.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar os usuários' });
    }
  });

router.put('/users/:id', userAuth, async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            await user.update(req.body);
            res.status(200).json(user);
        }else{
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    }catch(error){
        res.status(500).json({ erro: 'Erro ao atualizar o usuário' });
    }
});

router.delete('/users/:id', userAuth, async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: 'Usuário excluído com sucesso' });
        }else{
            res.status(404).json({ erro: 'Usuário não encontrado' });
        }
    }catch(error){
        res.status(500).json({ erro: 'Erro ao excluir o usuário' });
    }
});

router.delete('/users', userAuth, async (req, res) => {
    try{
        await User.destroy({ where: {}, truncate: true });
        res.status(200).json({ message: 'Todos os usuários foram excluídos com sucesso' });
    }catch(error){
        res.status(500).json({ erro: 'Erro ao excluir todos os usuários' });
    }
});

router.post("/users", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já está em uso' });
    }

    // Criptografar a senha
    const hashedPassword = bcrypt.hashSync(senha, 10);

    // Criar o novo usuário
    const newUser = await User.create({
      nome,
      email,
      senha: hashedPassword
    });

    // Gerar o token JWT
    const token = generateToken(newUser);

    // Retornar o usuário e o token
    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: { id: newUser.id, nome: newUser.nome, email: newUser.email },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar o usuário' });
  }
});

module.exports = router;