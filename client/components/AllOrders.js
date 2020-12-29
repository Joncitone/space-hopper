import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

export const AllOrders = props => {
  return (
    <div>
      <h1>All Orders</h1>
    </div>
  )
}

export default connect(null, null)(AllOrders)
