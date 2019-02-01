import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { isEmpty } from 'lodash';
import { List, Button, Grid, Divider, Segment, Message, Form } from 'semantic-ui-react'

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

  signUp = () => {
    this.props.signUp(this.state.signUpUsername, this.state.signUpPassword);
    this.setState({
      signUpUsername: '',
      signUpPassword: ''
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
      <Segment style={{background: 'none', verticalAlign: 'middle', border: 0, boxShadow: 'none'}}>
        <Divider hidden />
        <Divider hidden />
        <Grid centered columns={2} style={{fontSize: '1.5em', width: '75%', display: 'inline-block'}}>
          <Grid.Column>
            {this.state.showUnsuccessful && (<Message negative>unsuccessful sign in attempt</Message>)}
            <h3>Sign In</h3>
            <Form style={{textAlign: 'left'}}>
              <Form.Field required>
                <label>username:</label>
                <input type="text" name="username" value={this.state.logInUsername} onChange={this.handleLogInUsernameChange} />
              </Form.Field>
              <Form.Field required>
                <label>password:</label>
                <input type="password" name="password" value={this.state.logInPassword} onChange={this.handleLogInPasswordChange} />
              </Form.Field>
              <Button onClick={this.logIn} type='submit'>Sign in</Button>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <h3>Sign Up</h3>
            <Form style={{textAlign: 'left'}}>
              <Form.Field required>
                <label>username:</label>
                <input type="text" name="username" value={this.state.signUpUsername} onChange={this.handleSignUpUsernameChange} />
              </Form.Field>
              <Form.Field required>
                <label>password:</label>
                <input type="password" name="password" value={this.state.signUpPassword} onChange={this.handleSignUpPasswordChange} />
              </Form.Field>
              <Button onClick={this.signUp} type='submit'>Sign up</Button>
            </Form>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <List verticalAlign='middle'>
          <List.Item>
            <List.Content>
              <List.Description>or try it out as a guest by clicking <Button basic color='red' onClick={() => this.props.logIn('guest', 'guest')}>here</Button> and using the info below</List.Description>
              <List.Description>username: guest</List.Description>
              <List.Description>password: guest</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    )
  }
}

export default LogIn;
