import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class User extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return !this.props.loggedIn ? (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: this.props.location }
        }}
      />
    ) : (
      <h3>Welcome {this.props.username}!</h3>
    )
  }
}

export default User;
