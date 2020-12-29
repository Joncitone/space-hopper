import React, {useState, useEffect} from 'react'
import history from '../history'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {
  fetchCartThunk,
  addOrUpdateProductThunk,
  removeProductFromCartThunk
} from '../store/cart'
import {putOrder} from '../store/order'

const Cart = props => {
  const {
    products,
    order,
    orderId,
    getCart,
    addOrUpdateProduct,
    removeProductFromCart,
    updateOrderStatus
  } = props

  useEffect(() => {
    async function callGetCart() {
      await getCart()
    }
    callGetCart()
  }, [])

  async function handleRemoveFromCart(productId) {
    await removeProductFromCart(orderId, productId)
    await getCart()
  }

  async function handleIncreaseQuantity(productId) {
    await addOrUpdateProduct(orderId, productId, 1)
    await getCart()
  }

  async function handleCheckout(orderTotal) {
    //set purchase price on through table
    Promise.all(
      products.map(async product => {
        const purchasePrice = Math.round(product.price)
        await axios.put(`/api/cart/checkout/${orderId}/product/${product.id}`, {
          purchasePrice
        })
      })
    )

    //update order, status to completed, place order total
    orderTotal *= 100
    await axios.put(`/api/orders/${orderId}`, {
      status: 'completed',
      orderTotal: Math.round(orderTotal)
    })

    //set new empty cart
    await getCart()

    //redirect to confirmation page component

    function pageRedirect() {
      setTimeout(function() {
        history.push('/confirmation')
      }, 1000)
    }

    pageRedirect()
  }

  let orderTotal
  return !products ? (
    <div>Loading</div>
  ) : (
    <div>
      <h1>Cart</h1>
      <div className="card">
        <ul className="list-group list-group-flush">
          {products.map(product => (
            <li key={product.id} className="list-group-item">
              <br />
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} className="w-25" />
                <br />
                {product.name}
              </Link>
              <br />
              {`Price $${product.price / 100}`}
              <br />
              {`Quantity ${product.order_products.quantity}`}
              <br />
              {`Subtotal $${(
                product.price *
                product.order_products.quantity /
                100
              ).toFixed(2)}`}
              {/* code for displaying whether the product is in stock */}
              <br />
              <button
                type="button"
                className="btn btn-outline-primary mx-2 mb-2"
                onClick={() => handleIncreaseQuantity(product.id)}
              >
                Increase quantity
              </button>
              <button
                type="button"
                className="btn btn-outline-primary mx-2 mb-2"
                onClick={() => handleRemoveFromCart(product.id)}
              >
                Remove from cart
              </button>
            </li>
          ))}
          <li className="list-group-item">
            {`Order Total $${(orderTotal =
              order.products.reduce((accum, currVal) => {
                return (accum +=
                  currVal.price * currVal.order_products.quantity)
              }, 0) / 100).toFixed(2)}`}
            <button
              type="button"
              className="btn btn-outline-primary mx-2 mb-2"
              onClick={() => handleCheckout(orderTotal)}
            >
              Checkout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    orderId: state.cart.order.id,
    order: state.cart.order,
    products: state.cart.order.products
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(fetchCartThunk()),
    updateOrderStatus: (orderId, order) => dispatch(putOrder(orderId, order)),
    addOrUpdateProduct: (orderId, productId, quantity) =>
      dispatch(addOrUpdateProductThunk(orderId, productId, quantity)),
    removeProductFromCart: (orderId, productId) =>
      dispatch(removeProductFromCartThunk(orderId, productId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
