const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser'); 

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

const agendamentosController = require("./agendamentos/AgendamentosController");
const funcionariosController = require("./funcionarios/FuncionariosController");
const tiposDeCortesController = require("./tiposDeCortes/TiposDeCortesController");
const horariosController = require("./horarios/HorariosController");
const usersController = require("./users/UsersController");

app.use("/", agendamentosController);
app.use("/", funcionariosController);
app.use("/", tiposDeCortesController);
app.use("/", horariosController);
app.use("/", usersController);

// Porta do Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});