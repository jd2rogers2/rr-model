import React, { Component } from 'react';
import { Segment, Grid, Divider, List, Button, Image } from 'semantic-ui-react'
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
      <Segment style={{background: 'none', height: '100vh', verticalAlign: 'middle', border: 0, boxShadow: 'none'}}>
        <Divider hidden />
        <Divider hidden />
        <Grid columns={2} style={{fontSize: '1.5em'}}>
          <Grid.Column>
            <List verticalAlign='middle'>
              <List.Item>
                <List.Content>
                  <List.Header>
                    To login and start clicking around
                  </List.Header>
                  <List.Description>Account > Sign up</List.Description>
                  <List.Description>or click <Button basic color='red' onClick={() => this.props.logIn('guest', 'guest')}>here</Button> to use info below</List.Description>
                  <List.Description>username: guest</List.Description>
                  <List.Description>password: guest</List.Description>
                </List.Content>
              </List.Item>
            </List>
            <List verticalAlign='middle'>
              <List.Item>
                <List.Content>
                  <List.Header>Welcome to my Rails and ReactJs portfolio site!</List.Header>
                  <List.Description>
                    This portfolio code sample shows my ability to work with <Image size='mini' spaced src={'https://i.pinimg.com/originals/f3/47/70/f34770503b90f26ea389f557500ff825.png'} /> plus <Image size='mini' spaced src={'https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png'} /> on the frontend and <Image size='mini' spaced src={'https://upload.wikimedia.org/wikipedia/commons/1/16/Ruby_on_Rails-logo.png'} /> as an api.
                  </List.Description>
                  <Divider hidden />
                  <List.Description>
                    source code: <a href="https://github.com/jd2rogers2/rr-model">https://github.com/jd2rogers2/rr-model</a>.
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
            <List verticalAlign='middle'>
              <List.Item>
                <List.Content>
                  <List.Description>
                    email: jd2rogers2@gmail.com
                  </List.Description>
                  <List.Description>
                    linkedin: <a href="https://www.linkedin.com/in/jd2rogers2/">https://www.linkedin.com/in/jd2rogers2/</a>
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <Image fluid src="https://imgur.com/KteOtrD.png?1" title="source: imgur.com" />
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

export default Home;
