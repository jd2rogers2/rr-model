import React from 'react';
import { Link } from 'react-router-dom';
import { Header as SemHeader, Button, Icon, Image, Container, Grid } from 'semantic-ui-react'

const Header = ({loggedIn, logOut}) => (
  <div style={{width: '95%', display: 'inline-block'}}>
    <SemHeader textAlign='center' as='h2' attached='top'>
      <Container textAlign='center'>
        <Image size='mini' inline src={'https://upload.wikimedia.org/wikipedia/commons/1/16/Ruby_on_Rails-logo.png'} />
        <Icon name='plus' fitted />
        <Image size='mini' inline src={'https://i.pinimg.com/originals/f3/47/70/f34770503b90f26ea389f557500ff825.png'} />
        ecommerce
      </Container>
    </SemHeader>
    <SemHeader as='h3'>
      <Grid textAlign='center' columns={5}>
        <Grid.Row>
          <Grid.Column>
            <Link to="/">
              <Button style={{padding: '11px', backgroundColor: 'blue'}} fluid content='Home' icon='home' labelPosition='left' />
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to="/shop">
              <Button style={{padding: '11px', backgroundColor: 'blue'}} fluid content='Shop' icon='grid layout' labelPosition='left' />
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to="/profile">
              <Button style={{padding: '11px', backgroundColor: 'blue'}} fluid content='Profile' icon='user' labelPosition='left' />
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to="/cart">
              <Button style={{padding: '11px', backgroundColor: 'blue'}} fluid content='Cart' icon='cart' labelPosition='left' />
            </Link>
          </Grid.Column>
          <Grid.Column>
            {loggedIn ? (
              <Button style={{padding: '11px', backgroundColor: 'blue'}} fluid onClick={logOut} content='Log out' icon='user circle' labelPosition='left' />
            ) : (
              <Link to="/login">
                <Button style={{padding: '11px', backgroundColor: 'blue'}} fluid content='Log in/Sign up' icon='user circle' labelPosition='left' />
              </Link>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </SemHeader>
  </div>
);

export default Header;
