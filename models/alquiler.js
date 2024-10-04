'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alquiler extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Alquiler.belongsTo(models.Cliente, {foreignKey: "clienteId"})

      Alquiler.belongsTo(models.Auto, {foreignKey: "autoId"})
    }
  }
  Alquiler.init({
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Alquiler',
  });

  return Alquiler;
};