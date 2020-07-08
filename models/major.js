'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Major extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Major.belongsTo(models.Category, {foreignKey: 'category_id', as: 'category'})
    }
  };
  Major.init({
    name: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    stok: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Major',
  });
  return Major;
};