import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchCartThunk} from '../store/cart'

//DO NOT EDIT
export const UserHome = props => {
  const {email, getCart} = props

  useEffect(() => {
    getCart()
  }, [])

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(fetchCartThunk())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

//PropTypes
UserHome.propTypes = {
  email: PropTypes.string
}
