import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchUsers, deleteSelectedUser} from '../store/userReducer'
import {Link} from 'react-router-dom'

const AllUsers = props => {
  useEffect(() => {
    getUsers()
  }, [])

  const handleDelete = id => {
    props.deleteSelectedUser(id)
  }

  const {users, getUsers} = props

  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col" />
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <Link to={`/users/${user.id}`}>
                  <button type="button" className="btn btn-outline-info mr-2">
                    View
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(user.id)}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const mapState = state => {
  return {
    users: state.userReducer.list
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers()),
    deleteSelectedUser: id => dispatch(deleteSelectedUser(id))
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
