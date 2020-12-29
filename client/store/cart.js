import axios from 'axios'
import history from '../history'
import product from './product'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'
const SET_CART_CONTENTS = 'SET_CART_CONTENTS'
const ADD_OR_UPDATE_PRODUCT = 'ADD_OR_UPDATE_PRODUCT'
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'

/**
 * ACTION CREATORS
 */
const setCart = order => ({type: SET_CART, order})

const setCartContents = products => ({type: SET_CART_CONTENTS, products})

const addOrUpdateProduct = (productId, quantity) => ({
  type: ADD_OR_UPDATE_PRODUCT,
  productId,
  quantity
})

const removeProductFromCart = productId => ({
  type: REMOVE_PRODUCT_FROM_CART,
  productId
})

/**
 * THUNK CREATORS
 */

export const fetchCartThunk = () => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/cart`)
      dispatch(setCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchCartContentsThunk = orderId => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/cart/${orderId}`)

      //sets an array of cart contents (row from through table) on products
      dispatch(setCartContents(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addOrUpdateProductThunk = (orderId, productId, quantity) => {
  return async function(dispatch) {
    try {
      if (!quantity) {
        quantity = 1
      }
      const {data} = await axios.post(
        `/api/cart/${orderId}/product/${productId}`,
        {
          quantity
        }
      )
      dispatch(addOrUpdateProduct(productId, quantity))
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeProductFromCartThunk = (orderId, productId) => {
  return async function(dispatch) {
    try {
      await axios.delete(`/api/cart/${orderId}/product/${productId}`)
      dispatch(removeProductFromCart(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  //a list of products in the cart
  order: {},
  products: []
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return {...state, order: action.order}
    case SET_CART_CONTENTS:
      return {...state, products: action.products}
    case ADD_OR_UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.productId) product = action.product
          return product
        })
      }
    case REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.productId
        )
      }
    default:
      return state
  }
}
