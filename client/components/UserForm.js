import React from 'react'

const UserForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div className="form-row">
      <label htmlFor="firstName">First Name:</label>
      <input
        className="form-control"
        placeholder={props.firstName}
        type="text"
        name="firstName"
        value={props.firstName}
        onChange={props.handleChange}
      />
    </div>
    <div className="form-row">
      <label htmlFor="lastName">Last Name:</label>
      <input
        className="form-control"
        placeholder={props.lastName}
        type="text"
        name="lastName"
        value={props.lastName}
        onChange={props.handleChange}
      />
    </div>

    <div className="form-row">
      <label htmlFor="address">Address:</label>
      <input
        className="form-control"
        type="text"
        name="address"
        value={props.address}
        onChange={props.handleChange}
      />
    </div>

    <div className="form-row">
      <label htmlFor="phone">Phone:</label>
      <input
        className="form-control"
        type="text"
        name="phone"
        value={props.phone}
        onChange={props.handleChange}
      />
    </div>

    <div className="form-row">
      <label htmlFor="email">Email:</label>
      <input
        className="form-control"
        type="text"
        name="email"
        value={props.email}
        onChange={props.handleChange}
      />
    </div>
    <div className="form-row">
      <button className="btn btn-info mt-3" type="submit">
        UPDATE
      </button>
    </div>
  </form>
)

export default UserForm
