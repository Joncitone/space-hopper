import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

export const ConfirmationPage = props => {
  return (
    <div>
      <h1>Confirmation Page</h1>
      <h2>
        Thank you for your purchase, you will receive a confirmation email
        shortly
      </h2>
      <h3>How did we receive payment from you? Don't worry about it!</h3>
      <h4>Shhhhhhh....</h4>
    </div>
  )
}

export default connect(null, null)(ConfirmationPage)
