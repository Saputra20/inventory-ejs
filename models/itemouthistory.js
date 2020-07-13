'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemOutHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemOutHistory.belongsTo(models.Major, {foreignKey: 'item_id', as: 'major'})
    }
  };
  ItemOutHistory.init({
    name: DataTypes.STRING,
    item_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ItemOutHistory',
  });
  return ItemOutHistory;
};