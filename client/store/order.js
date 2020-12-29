import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_ORDERS = 'SET_ORDERS'
const SET_CART = 'SET_CART'
const SET_SINGLE_ORDER = 'SET_SINGLE_ORDER'
const ADD_ORDER = 'ADD_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'

/**
 * ACTION CREATORS
 */
const setOrders = orders => ({type: SET_ORDERS, orders})
const setCart = cart => ({type: SET_CART, cart})
const setSingleOrder = order => ({type: SET_SINGLE_ORDER, order})
const addOrder = order => ({type: ADD_ORDER, order})
const updateOrder = order => ({type: UPDATE_ORDER, order})
const removeOrder = orderId => ({type: REMOVE_ORDER, orderId})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/orders')
      const orders = response.data
      const action = setOrders(orders)
      dispatch(action)
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const fetchCart = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/orders/cart`)
      dispatch(setCart(response.data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const fetchSingleOrder = orderId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`)
      const order = response.data
      const action = setSingleOrder(order)
      dispatch(action)
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const postOrder = order => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/orders', order)
      dispatch(addOrder(response.data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const putOrder = (orderId, order) => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/orders/${orderId}`, order)
      dispatch(updateOrder(response.data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteOrder = orderId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/orders/${orderId}`)
      dispatch(removeOrder(orderId))
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
  cart: {},
  selectedOrder: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return {...state, list: action.orders}
    case SET_CART:
      return {...state, cart: action.cart}
    case SET_SINGLE_ORDER:
      return {...state, selectedOrder: action.order}
    case ADD_ORDER:
      return {...state, list: [...state.list, action.order]}
    case UPDATE_ORDER:
      return {
        ...state,
        selectedOrder: action.order,
        list: state.list.map(order => {
          if (order.id === action.order.id) order = action.order
          return order
        })
      }
    case REMOVE_ORDER:
      return {
        ...state,
        list: state.list.filter(order => order.id !== action.orderId)
      }
    default:
      return state
  }
}
