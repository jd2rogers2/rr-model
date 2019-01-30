import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { isEmpty } from 'lodash';
import { List, Button } from 'semantic-ui-react'

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
          pathname: "/home",
          state: { from: this.props.location }
        }}
      />
    ) : (
      <div>
        <div>
          <ul>
            <h3>Sign In</h3>
            {this.state.showUnsuccessful && (<p>unsuccessful sign in attempt</p>)}
            <li>username: <input type="text" name="username" value={this.state.logInUsername} onChange={this.handleLogInUsernameChange} /></li>
            <li>password: <input type="password" name="password" value={this.state.logInPassword} onChange={this.handleLogInPasswordChange} /></li>
            <button onClick={this.logIn}>Sign In</button>
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
        <List verticalAlign='middle'>
          <List.Item>
            <List.Content>
              <List.Description>or try it out as a guest by clicking <Button basic color='red' onClick={() => this.props.logIn('guest', 'guest')}>here</Button> and using the info below</List.Description>
              <List.Description>username: guest</List.Description>
              <List.Description>password: guest</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </div>
    )
  }
}

export default LogIn;
