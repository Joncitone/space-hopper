import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchSingleOrder} from '../store/order'

const SingleOrder = props => {
  const {order, getOrder} = props
  useEffect(() => {
    const orderId = props.match.params.orderId
    getOrder(orderId)
  }, [])

  return <div>Single Order Page </div>
}

const mapState = state => {
  return {
    order: state.order.selectedOrder
  }
}

const mapDispatch = dispatch => {
  return {
    getOrder: orderId => dispatch(fetchSingleOrder(orderId))
  }
}

export default connect(mapState, mapDispatch)(SingleOrder)
