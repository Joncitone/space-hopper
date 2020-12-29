const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('cart', 'cancelled', 'pending', 'completed'),
    allowNull: false,
    defaultValue: 'cart'
  },
  orderTotal: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
