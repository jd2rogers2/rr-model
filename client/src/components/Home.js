import React, { Component } from 'react';
import { Segment, Grid, Divider, List } from 'semantic-ui-react'


class Home extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <Segment>
        <Grid columns={2}>
          <Grid.Column>
            <p style={{fontSize: '1.5em'}}>
              Welcome to my Rails and ReactJs portfolio site.
              To see more of the functionality, please create a new user or login with the guest information below.
              Once logged in you will be able to: add to cart, view cart, and view profile.
              I hope to be adding additional functionality soon, such as:
              checking out a cart (mock), edit user info, product categories and filtering, product search by name.
              You can find the source code at <a href="https://github.com/jd2rogers2/rr-model">https://github.com/jd2rogers2/rr-model</a>.
            </p>
            <Divider clearing />
            {this.props.loggedIn ? (
              <p>already logged in</p>
            ) : (
              <List verticalAlign='middle'>
                <List.Item>
                  <List.Content style={{fontSize: '1.5em'}}>
                    <List.Header>go to the log in page or click <button onClick={() => this.props.logIn('guest', 'guest')}>here</button> to login with the below info</List.Header>
                    <List.Description>username: guest</List.Description>
                    <List.Description>password: guest</List.Description>
                  </List.Content>
                </List.Item>
              </List>
            )}
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid>
        <Divider vertical clearing></Divider>
      </Segment>
    )
  }
}

export default Home;
