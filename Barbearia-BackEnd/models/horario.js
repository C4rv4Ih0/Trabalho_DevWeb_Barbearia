'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Horario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Horario.init({
    hora: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Horario',
  });

  Horario.associate = (models) => {
    Horario.hasMany(models.Agendamento, { foreignKey: 'horaId' });
  };

  return Horario;
};