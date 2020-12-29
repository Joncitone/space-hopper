const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://icon-library.com/images/bag-icon-png/bag-icon-png-21.jpg'
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 10000
    }
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
    validate: {
      min: 100,
      max: 100000000
    }
  }
})

module.exports = Product
