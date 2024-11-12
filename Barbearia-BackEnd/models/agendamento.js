'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agendamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Agendamento.init({
    nome: DataTypes.STRING,
    telefone: DataTypes.STRING,
    data: DataTypes.DATEONLY,
    horaId: DataTypes.INTEGER,
    funcionarioId: DataTypes.INTEGER,
    tipoDeCorteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Agendamento',
  });

  Agendamento.associate = function(models) {
    // Definir relação de "muitos para um" (Appointment pertence a um Client)

    Agendamento.belongsTo(models.Horario, {
      foreignKey: 'horaId', // A chave estrangeira na tabela Appointment
      as: 'hora', // Nome da associação
    });

    Agendamento.belongsTo(models.Funcionario, {
      foreignKey: 'funcionarioId', // A chave estrangeira na tabela Appointment
      as: 'funcionario', // Nome da associação
    });

    Agendamento.belongsTo(models.TipoCorte, {
      foreignKey: 'tipoDeCorteId', // A chave estrangeira na tabela Appointment
      as: 'tipoDeCorte', // Nome da associação
    });
  };

  return Agendamento;
};