/** IMPORTS */
const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const OrderProduct = require('./order_product')

/** ASSOCIATIONS */

//One to Many association
User.hasMany(Order)
Order.belongsTo(User)

//Many to Many association
Product.belongsToMany(Order, {through: 'order_products'})
Order.belongsToMany(Product, {through: 'order_products'})

/** EXPORTS */

module.exports = {
  User,
  Order,
  Product,
  OrderProduct
}
