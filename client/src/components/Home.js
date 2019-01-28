import React, { Component } from 'react';
import { Segment, Grid, Divider, List, Button } from 'semantic-ui-react'
import { isEmpty } from 'lodash';

class Home extends Component {
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
    return (
      <Segment>
        <Grid columns={2}>
          <Grid.Column>
            <List verticalAlign='middle' style={{fontSize: '1.5em'}}>
              <List.Item>
                <List.Content>
                  <List.Header>Welcome to my Rails and ReactJs portfolio site!</List.Header>
                  <List.Description>Tech description</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Item>
                  To experience more of the functionality, please create a new user or login with the guest information below.
                </List.Item>
                <List.Item>
                  Once logged in you will be able to:
                </List.Item>
                <List.Item>
                  add to cart, search products by name, view cart, and view profile
                </List.Item>
                <List.Item>
                  I hope to be adding additional functionality soon, such as:
                </List.Item>
                <List.Item>
                  checking out a cart (mock), edit user info, product categories and filtering
                </List.Item>
              </List.Item>
              <List.Description>
                You can find the source code at <a href="https://github.com/jd2rogers2/rr-model">https://github.com/jd2rogers2/rr-model</a>.
              </List.Description>
            </List>
          </Grid.Column>
          <Grid.Column>
            {this.props.loggedIn ? (
              <div>
                <p>welcome {this.props.username}</p>
                <Button negative onClick={this.props.logOut}>Log out</Button>
              </div>
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
                <List verticalAlign='middle'>
                  <List.Item>
                    <List.Content style={{fontSize: '1.5em'}}>
                      <List.Header>go to the log in page or click <button onClick={() => this.props.logIn('guest', 'guest')}>here</button> to login with the below info</List.Header>
                      <List.Description>username: guest</List.Description>
                      <List.Description>password: guest</List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </div>
            )}
          </Grid.Column>
        </Grid>
        <Divider vertical clearing></Divider>
      </Segment>
    )
  }
}

export default Home;
