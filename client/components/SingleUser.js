import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {putUser, fetchSingleUser} from '../store/userReducer'
import Axios from 'axios'
import UserForm from './UserForm'

/**
 * COMPONENT
 */

export class SingleUser extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    try {
      const userId = this.props.match.params.userId
      this.props.fetchSingleUser(userId)
    } catch (error) {
      console.log(error)
    }
  }

  async handleSubmit(event) {
    event.preventDefault()
    const userId = this.props.user.id
    await Axios.put(`/api/users/${userId}`, this.state)
    this.props.fetchSingleUser(userId)
    this.setState({
      firstName: '',
      lastName: '',
      address: ''
    })
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const {user} = this.props

    return (
      <main>
        <div className="row">
          <div className="col-sm-6">
            <h3 className="lead">User Information </h3>{' '}
            <div className="card">
              <div className="card-body">
                <p className="card-title">
                  <strong>First Name:</strong> <span />
                  {user.firstName}
                </p>
                <p className="card-title">
                  <strong>Last Name:</strong> <span />
                  {user.lastName}
                </p>
                <p className="card-text">
                  {' '}
                  <strong>Address:</strong> {user.address}{' '}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
            </div>
          </div>
          <UserForm
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </main>
    )
  }
}

const mapState = reduxState => {
  return {
    user: reduxState.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleUser: id => dispatch(fetchSingleUser(id))
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
