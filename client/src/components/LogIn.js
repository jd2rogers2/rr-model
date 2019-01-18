import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { isEmpty } from 'lodash';

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logInUsername: '',
      logInPassword: '',
      signUpUsername: '',
      signUpPassword: '',
      showUnsuccessful: false
    }
  }

  componentDidMount() {}

  handleLogInUsernameChange = event => {
    this.setState({ logInUsername: event.target.value });
  }

  handleLogInPasswordChange = event => {
    this.setState({ logInPassword: event.target.value });
  }

  handleSignUpUsernameChange = event => {
    this.setState({ signUpUsername: event.target.value });
  }

  handleSignUpPasswordChange = event => {
    this.setState({ signUpPassword: event.target.value });
  }

  logIn = () => {
    this.props.logIn(this.state.logInUsername, this.state.logInPassword).then(response => {
      if (isEmpty(response)) {
        this.setState({
          showUnsuccessful: true,
          logInUsername: '',
          logInPassword: ''
        });
      }
    });
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
        <div>
          <ul>
            <h3>Log In</h3>
            {this.state.showUnsuccessful && (<p>unsuccessful log in attempt</p>)}
            <li>username: <input type="text" name="username" value={this.state.logInUsername} onChange={this.handleLogInUsernameChange} /></li>
            <li>password: <input type="password" name="password" value={this.state.logInPassword} onChange={this.handleLogInPasswordChange} /></li>
            <button onClick={this.logIn}>Log In</button>
          </ul>
        </div>
        <div>
          <ul>
            <h3>Sign Up</h3>
            <li>username: <input type="text" name="username" value={this.state.signUpUsername} onChange={this.handleSignUpUsernameChange} /></li>
            <li>password: <input type="password" name="password" value={this.state.signUpPassword} onChange={this.handleSignUpPasswordChange} /></li>
            <button onClick={() => this.props.signUp(this.state.signUpUsername, this.state.signUpPassword)}>Sign Up</button>
          </ul>
        </div>
      </div>
    )
  }
}

export default LogIn;
