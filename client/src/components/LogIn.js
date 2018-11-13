import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {}

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  }

  render(){
    return this.props.loggedIn ? (
      <Redirect
        to={{
          pathname: "/shop",
          state: { from: this.props.location }
        }}
      />
    ) : (
      <div>
        <ul>
          <li>username: <input type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange} /></li>
          <li>password: <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} /></li>
          <button onClick={() => this.props.logIn(this.state.username, this.state.password)}>Log In</button>
        </ul>
      </div>
    )
  }
}

export default LogIn;
