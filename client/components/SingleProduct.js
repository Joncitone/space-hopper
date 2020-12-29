import React, {useState, useEffect} from 'react'
import {fetchSingleProduct} from '../store/product'
import {connect} from 'react-redux'

import {addOrUpdateProductThunk, fetchCartThunk} from '../store/cart.js'
import ProdQtyButton from './ProdQtyButton'

const SingleProduct = props => {
  const {product, getProduct, getCart, orderId, addOrUpdateProduct} = props

  const [productQty, setProductQty] = useState(1)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const productId = props.match.params.productId
    getProduct(productId)
    getCart()
  }, [])
  // create onAddToCart function in main component (index.js?)
  //const onAddToCart = () => addOrUpdateProductThunk()

  function handleClick(productId) {
    addOrUpdateProduct(orderId, productId, productQty)
  }

  const IncrementItem = () => {
    if (productQty < 9) {
      setProductQty(productQty + 1)
    } else {
      return null
    }
  }

  const DecreaseItem = () => {
    if (productQty > 1) {
      setProductQty(productQty - 1)
    } else {
      return null
    }
  }

  const ToggleClick = () => {
    setShow(!show)
  }

  const handleChange = event => {
    setProductQty(event.target.value)
  }

  return (
    <div>
      <br />
      <img src={product.imageUrl} className="w-25" />
      <br />
      {product.name}
      <br />${product.price / 100}
      <br />
      {product.description}
      <br />
      {/* <ProdQtyButton/> */}
      <div className="row">
        <div className="border border-dark ">
          <button
            type="button"
            className="btn btn-default mx-2 mb-2 "
            onClick={DecreaseItem}
          >
            -
          </button>
          <input
            className="border-0 w-10 col-xs-2"
            value={productQty}
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-default mx-2 mb-2 "
            onClick={IncrementItem}
          >
            +
          </button>
        </div>
        <br />
        <button
          type="button"
          className="btn btn-default mx-2 mb-2 border-dark rounded-0"
          onClick={() => {
            handleClick(product.id)
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    product: state.product.selectedProduct,
    orderId: state.cart.order.id
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: productId => dispatch(fetchSingleProduct(productId)),
    addOrUpdateProduct: (orderId, productId, quantity) =>
      dispatch(addOrUpdateProductThunk(orderId, productId, quantity)),
    getCart: () => dispatch(fetchCartThunk())
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
