const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    const error = new Error('You do not have access')
    error.status = 401
    return next(error)
  }
  next()
}

//Read all route
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//Read one route
router.get('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId
    const product = await Product.findByPk(id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    next(err)
  }
})

//Create route
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    if (newProduct) {
      res.json(newProduct)
    } else {
      res.status(400).end()
    }
  } catch (err) {
    next(err)
  }
})

//Update route
router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id
    const [numUpdated, updatedProduct] = await Product.update(req.body, {
      where: {id},
      returning: true,
      plain: true
    })
    if (numUpdated) {
      res.json(updatedProduct[0])
    } else {
      res.status(400).end()
    }
  } catch (err) {
    next(err)
  }
})

//Delete route
router.delete('/:productId', isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id
    const productDeleted = await Product.destroy({where: {id}})
    if (productDeleted) {
      res.send('product sucessfully deleted')
    } else {
      res.send('error in deletion request')
    }
  } catch (err) {
    next(err)
  }
})
