import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class LogIn extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render(){
    return this.props.loggedIn ? (
      <Redirect
        to={{
          pathname: "/products",
          state: { from: this.props.location }
        }}
      />
    ) : (
      <div>
        <ul>
          <li>username: <input type="text" /></li>
          <li>password: <input type="text" /></li>
          <button onClick={this.props.logIn}>Log In</button>
        </ul>
      </div>
    )
  }
}

export default LogIn;
