import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * ACTION CREATORS
 */
const setProducts = products => ({type: SET_PRODUCTS, products})
const setSingleProduct = product => ({type: SET_SINGLE_PRODUCT, product})
const addProduct = product => ({type: ADD_PRODUCT, product})
const updateProduct = product => ({type: UPDATE_PRODUCT, product})
const removeProduct = productId => ({type: REMOVE_PRODUCT, productId})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/products')
      const products = response.data
      const action = setProducts(products)
      dispatch(action)
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/products/${productId}`)
      const product = response.data
      const action = setSingleProduct(product)
      dispatch(action)
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const postProduct = product => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/products', product)
      dispatch(addProduct(response.data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const putProduct = product => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/products/${product.id}`, product)
      dispatch(updateProduct(response.data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteProduct = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(removeProduct(productId))
    } catch (err) {
      console.error(err.message)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  list: [],
  selectedProduct: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, list: action.products}
    case SET_SINGLE_PRODUCT:
      return {...state, selectedProduct: action.product}
    case ADD_PRODUCT:
      return {...state, list: [...state.list, action.product]}
    case UPDATE_PRODUCT:
      return {
        ...state,
        selectedProduct: action.product,
        list: state.list.map(product => {
          if (product.id === action.product.id) product = action.product
          return product
        })
      }
    case REMOVE_PRODUCT:
      return {
        ...state,
        list: state.list.filter(product => product.id !== action.productId)
      }
    default:
      return state
  }
}
