'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Auto.hasMany(models.Alquiler, { foreignKey: "autoId" })
    }
  }
  Auto.init({
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING,
    year: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Auto',
  });

  return Auto;
};