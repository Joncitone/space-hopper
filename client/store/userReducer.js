import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_USERS = 'SET_USERS'
const SET_SINGLE_USER = 'SET_SINGLE_USER'
const ADD_USER = 'ADD_USER'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'

/**
 * ACTION CREATORS
 */

const setUsers = users => ({type: SET_USERS, users})
const setSingleUser = user => ({type: SET_SINGLE_USER, user})
const addUser = user => ({type: ADD_USER, user})
const updateUser = user => ({type: UPDATE_USER, user})
const deleteUser = userId => ({type: DELETE_USER, userId})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(setUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchSingleUser = userId => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/users/${userId}`)
      dispatch(setSingleUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const postUser = user => {
  return async function(dispatch) {
    try {
      const {data} = await axios.post('/api/users', user)
      dispatch(addUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const putUser = user => {
  return async function(dispatch) {
    try {
      const {data} = await axios.put(`/api/users/${user.id}`, user)
      dispatch(updateUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteSelectedUser = userId => {
  return async function(dispatch) {
    try {
      await axios.delete(`/api/users/${userId}`)
      dispatch(deleteUser(userId))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  list: [],
  selectedUser: {}
}
//______________________________________________________

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return {...state, list: action.users}
    case SET_SINGLE_USER:
      return {...state, selectedUser: action.user}
    case ADD_USER:
      return {...state, list: [...state.list, action.user]}
    case UPDATE_USER:
      return {
        ...state,
        selectedUser: action.user,
        list: state.list.map(user => {
          if (user.id === action.user.id) user = action.user
          return user
        })
      }
    case DELETE_USER:
      return {
        ...state,
        list: state.list.filter(user => user.id !== action.userId)
      }
    default:
      return state
  }
}
