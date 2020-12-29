const router = require('express').Router()
const {Order, User, Product} = require('../db/models')

//verifying that the person has admin rights
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    const error = new Error('You are not authorized to perform this action')
    error.status = 401
    return next(error)
  }
  next()
}

const isSelfOrAdmin = (req, res, next) => {
  if (req.params.id !== req.user.id || !req.user.isAdmin) {
    const error = new Error('You are not authorized to perform this action')
    error.status = 401
    return next(error)
  }
  next()
}

//get all orders
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ['status'],
      include: [{model: User}, {model: Product}]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

//get one order by orderNumber
//need a way to restrict this to admins and users?
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

//create new order
//need a way to restrict this to admins and users?
router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.json(order))
    .catch(next)
})

//delete an order
router.delete('/:orderId', isAdmin, (req, res, next) => {
  Order.destroy({
    where: {
      id: req.params.orderId
    }
  })
    .then(() => res.status(204).end())
    .catch(next)
})

//update an order
router.put('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId
    const orderToUpdate = await Order.findByPk(id)
    await orderToUpdate.update(req.body)
    res.status(200).end()
    // const [numUpdated, updatedOrder] = await Order.update(req.body, {
    //   where: {id},
    //   returning: true,
    //   plain: true,
    // })
    // if (numUpdated) {
    //   res.json(updatedOrder[0])
    // } else {
    //   res.status(400).end()
    // }
  } catch (err) {
    next(err)
  }
})

module.exports = router
