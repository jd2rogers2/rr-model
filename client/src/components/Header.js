import React from 'react';
import { Link } from 'react-router-dom';
import { Header as SemHeader, Button, Icon, Image, Container, Grid } from 'semantic-ui-react'

const Header = ({loggedIn, logOut}) => (
  <div>
    <SemHeader textAlign='center' as='h2' attached='top'>
      <Container textAlign='center'>
        <Image size='mini' inline src={'https://cdn4.iconfinder.com/data/icons/scripting-and-programming-languages/158/Ruby_on_Rails_2-512.png'} />
        <Icon name='plus' fitted /> <Icon name='react' fitted /> ecommerce
      </Container>
    </SemHeader>
      <SemHeader as='h3' textAlign='justified'>
        <Grid textAlign='center' columns={4}>
          <Grid.Row>
            <Grid.Column>
              <Link to="/shop">
                <Button animated='fade'>
                  <Button.Content visible><Icon name='grid layout' /></Button.Content>
                  <Button.Content hidden>Shop</Button.Content>
                </Button>
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link to="/profile">
                <Button animated='fade'>
                  <Button.Content visible><Icon name='user' /></Button.Content>
                  <Button.Content hidden>Profile</Button.Content>
                </Button>
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link to="/cart">
                <Button animated='fade'>
                  <Button.Content visible><Icon name='cart' /></Button.Content>
                  <Button.Content hidden>Cart</Button.Content>
                </Button>
              </Link>
            </Grid.Column>
            <Grid.Column>
              {loggedIn ? (
                <Button onClick={logOut} animated='fade'>
                  <Button.Content visible><Icon name='user circle' /></Button.Content>
                  <Button.Content hidden>Log out</Button.Content>
                </Button>
              ) : (
                <Link to="/login">Log-In/Sign-Up</Link>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </SemHeader>
  </div>
);

export default Header;
