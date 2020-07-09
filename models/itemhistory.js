'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemHistory.belongsTo(models.Category, {foreignKey: 'category_id', as: 'category'})
    }
  };
  ItemHistory.init({
    name: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    stok: DataTypes.INTEGER,
    date: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ItemHistory',
  });
  return ItemHistory;
};