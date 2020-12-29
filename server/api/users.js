const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//verifying that the person has admin rights
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    const error = new Error('You are not authorized to perform this action')
    error.status = 401
    return next(error)
  }
  next()
}

//verifying that the person who wants to perform an action can only do so to their record
const isSelfOrAdmin = (req, res, next) => {
  if (req.params.id !== req.user.id || !req.user.isAdmin) {
    const error = new Error('You are not authorized to perform this action')
    error.status = 401
    return next(error)
  }
  next()
}

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll()
    //{
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    // attributes: ['id', 'email']
    //}

    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.send(user)
  } catch (error) {
    next(error)
  }
})

router.post('/', isSelfOrAdmin, async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.send(newUser)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  //add a check for a user and admin
  try {
    const userToUpdate = await User.findByPk(req.params.id)
    res.send(await userToUpdate.update(req.body))
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id
    await User.destroy({where: {id}})
    const users = await User.findAll()
    res.status(204).json(users)
  } catch (error) {
    next(error)
  }
})
