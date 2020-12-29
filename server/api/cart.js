const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')
module.exports = router

//finds or creates cart (Order with cart status) for logged-in and guest users
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      //Logged-in Case
      const userId = req.user.id
      const cart = await Order.findOrCreate({
        where: {
          userId,
          status: 'cart'
        },
        include: [{model: Product}]
      })
      res.json(cart[0])
    } else {
      //Guest Case
      //console.log(typeof req.session.id) return sid which is a serial value?
      const userId = req.session.id //invalid input syntax for type integer (userId)
      const cart = await Order.findOrCreate({
        where: {
          userId, //invalid input syntax for type integer
          status: 'cart'
        }
      })
      res.json(cart[0])
    }
  } catch (err) {
    next(err)
  }
})

//gets information from OrderProduct through table based on orderId
router.get('/:orderId', async (req, res, next) => {
  try {
    const {orderId} = req.params
    //use orderId to findAll OrderProduct rows
    //with the information needed to display cart details.
    const cartDetails = await OrderProduct.findAll({
      where: {
        orderId
      }
    })
    res.json(cartDetails)
  } catch (err) {
    next(err)
  }
})

//updates purchasePrice upon checkout
router.put('/checkout/:orderId/product/:productId', async (req, res, next) => {
  try {
    const {orderId, productId} = req.params
    const {purchasePrice} = req.body
    await OrderProduct.update(
      {
        purchasePrice
      },
      {
        where: {orderId, productId}
      }
    )
    res.status(200).end()
  } catch (err) {
    next(err)
  }
})

router.post('/:orderId/product/:productId', async (req, res, next) => {
  try {
    const {orderId, productId} = req.params
    const [orderDetails] = await OrderProduct.findOrCreate({
      where: {
        orderId,
        productId
      }
    })
    //load product instance
    const productInstance = await Product.findByPk(productId)
    const {quantity} = req.body

    //decrement product inventory by given quantity
    await productInstance.decrement(['inventory'], {by: quantity})

    //increment order_products instance by quantity
    const updatedDetails = await orderDetails.increment(['quantity'], {
      by: quantity
    })

    //return updated instance of order details
    res.json(updatedDetails)
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId/product/:productId', async (req, res, next) => {
  try {
    const {orderId, productId} = req.params

    //find row to grab quantity (could also be passed by req.body? from state?)
    const productToRemove = await OrderProduct.findOne({
      where: {
        orderId,
        productId
      }
    })

    //load product instance
    const productInstance = await Product.findByPk(productId)

    //increment inventory by quantity from product being removed
    await productInstance.increment(['inventory'], {
      by: productToRemove.quantity
    })

    //remove row from through table
    const removalSuccess = await OrderProduct.destroy({
      where: {
        orderId,
        productId
      }
    })
    res.json(removalSuccess)
  } catch (err) {
    next(err)
  }
})
