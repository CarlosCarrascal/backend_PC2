const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Definir modelo Product con todos los campos requeridos
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  image_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  }
}, {
  tableName: 'products',
  timestamps: true,
  underscored: true
});

module.exports = Product;
