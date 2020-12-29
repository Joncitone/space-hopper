import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/product'
import {addOrUpdateProductThunk, fetchCartThunk} from '../store/cart.js'
import {connect} from 'react-redux'

export const AllProducts = props => {
  /*     //useState Hook below (substitute for local state)
  const [name, setName] = useState('');
  const [lasName, setLastName] = useState(''); */

  //prop destructuring
  const {products, getProducts, getCart, orderId, addOrUpdateProduct} = props

  //useEffect Hook
  useEffect(() => {
    getProducts()
    getCart()
  }, [])

  function handleClick(productId) {
    addOrUpdateProduct(orderId, productId, 1)
  }

  return (
    <div>
      <h1>All Products</h1>
      <div className="card-deck mb-5">
        {products.map(product => (
          <div key={product.id} className="card">
            <br />
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} className="w-100" />
              <br />
              {product.name}
            </Link>
            <br />${(product.price / 100).toFixed(2)}
            <br />
            {/* code for displaying whether the product is in stock */}
            <br />
            <button
              type="button"
              className="btn btn-default mx-2 mb-2 border-dark rounded-0"
              onClick={() => handleClick(product.id)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    products: state.product.list,
    orderId: state.cart.order.id
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    addOrUpdateProduct: (orderId, productId, quantity) =>
      dispatch(addOrUpdateProductThunk(orderId, productId, quantity)),
    getCart: () => dispatch(fetchCartThunk())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
