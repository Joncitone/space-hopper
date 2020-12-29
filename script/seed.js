'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderProduct} = require('../server/db/models/')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Admin',
      isAdmin: true,
      email: 'admin@email.com',
      password: 'password'
    }),
    User.create({
      firstName: 'Cody',
      lastName: 'Dog',
      email: 'cody@dog.com',
      password: '123'
    }),
    User.create({
      firstName: 'Ziti',
      lastName: 'Cat',
      email: 'ziti@cat.com',
      password: '456'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Cat',
      price: 20095,
      imageUrl: '/product-images/cat.jpg',
      inventory: 100,
      description:
        'Our eco-friendliest object of destruction, a cat will be more than adequate for your vase-smashing needs'
    }),
    Product.create({
      name: 'Catapult',
      price: 14995,
      imageUrl: '/product-images/catapult.jpg',
      inventory: 200,
      description:
        'Defend your abode medieval-style with this limited-edition weapon of vase destruction.'
    }),
    Product.create({
      name: 'Slingshot',
      price: 2495,
      imageUrl: '/product-images/slingshot2.jpg',
      inventory: 300,
      description:
        'Craving simplicity in your vase destruction routine? You will love our vase-optimized slingshot. Whether you shoot at that dastardly vase with a pebble or load up the infernal pottery itself, you are guaranteed to be in a shard pile in no time.'
    })
  ])

  const orders = await Promise.all([
    Order.create({
      status: 'cart',
      userId: 1
    }),
    Order.create({
      status: 'cart',
      userId: 2
    }),
    Order.create({
      status: 'cart',
      userId: 3
    })
  ])

  const orderProducts = await Promise.all([
    OrderProduct.create({
      quantity: 1,
      productId: 1,
      orderId: 1
    }),
    OrderProduct.create({
      quantity: 1,
      productId: 2,
      orderId: 2
    }),
    OrderProduct.create({
      quantity: 1,
      productId: 3,
      orderId: 3
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
