import React from 'react';
import { Link } from 'react-router-dom';
import { Header as SemHeader, Segment, Button, Icon } from 'semantic-ui-react'

const Header = ({loggedIn, logOut}) => (
  <div>
    <SemHeader as='h2' attached='top'>
      Shopping app in Rails and React
      <Icon name='react' />
    </SemHeader>
    <Segment attached>
      <SemHeader as='h3' textAlign='justified'>
        <Link to="/shop">
          <Button animated='fade'>
            <Button.Content visible><Icon name='grid layout' /></Button.Content>
            <Button.Content hidden>Shop</Button.Content>
          </Button>
        </Link>
        <Link to="/profile">Profile </Link>
        <Link to="/cart">
          <Button animated='fade'>
            <Button.Content visible><Icon name='cart' /></Button.Content>
            <Button.Content hidden>Shop</Button.Content>
          </Button>
        </Link>
        {loggedIn ? (
          <Button onClick={logOut} animated='fade'>
            <Button.Content visible><Icon name='user circle' /></Button.Content>
            <Button.Content hidden>Log out</Button.Content>
          </Button>
        ) : (
          <Link to="/login">Log-In/Sign-Up</Link>
        )}
      </SemHeader>
    </Segment>
  </div>
);

export default Header;
