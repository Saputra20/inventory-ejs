'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  Submission.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    age: DataTypes.INTEGER,
    company: DataTypes.STRING,
    position: DataTypes.STRING,
    date: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Submission',
  });
  return Submission;
};