'use strict';

// I think datatypes should be capped like DataTypes
// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const ProductTable = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      inventoryCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  return model;
};

module.exports = ProductTable;
