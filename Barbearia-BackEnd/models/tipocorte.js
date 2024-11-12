'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoCorte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TipoCorte.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'TipoCorte',
  });

  TipoCorte.associate = (models) => {
    TipoCorte.hasMany(models.Agendamento, { foreignKey: 'tipoDeCorteId' });
  };
  
  return TipoCorte;
};