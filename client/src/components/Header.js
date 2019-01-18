import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Header as SemHeader, Button, Icon, Image, Container, Grid, Menu, Input, Form } from 'semantic-ui-react'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '/',
      searchText: ''
    };
  }

  handleMenuClick = pageName => {
    this.setState({activeItem: pageName});
    this.props.history.push(pageName);
  }

  handleSearchChange = event => {
    this.setState({ searchText: event.target.value });
  }

//<Redirect push to="/sample" />
// maybe replace link with above if needed
  render(){
    const { activeItem } = this.state;
    return (
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
          <Menu pointing secondary>
            <Menu.Item name='/' active={activeItem === '/'} onClick={() => this.handleMenuClick('/')}>
              <Icon name='home' />Home
            </Menu.Item>
            <Menu.Item name='/shop' active={activeItem === '/shop'} onClick={() => this.handleMenuClick('/shop')}>
              <Icon name='grid layout' />Shop
            </Menu.Item>

            <Menu.Item name='/profile' active={activeItem === '/profile'} onClick={() => this.handleMenuClick('/profile')}>
              <Icon name='user' />Profile
            </Menu.Item>
            <Menu.Item name='/cart' active={activeItem === '/cart'} onClick={() => this.handleMenuClick('/cart')}>
              <Icon name='cart' />Cart
            </Menu.Item>

            <Menu.Menu position='right'>
              <Menu.Item>
                <Form onSubmit={() => this.props.fetchProducts(this.state.searchText)}>
                  <Form.Input onChange={this.handleSearchChange} action={{ type: 'submit', icon: 'search' }} placeholder='Search...' />
                </Form>
              </Menu.Item>
              {this.props.loggedIn ? (
                <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.props.logOut}>
                  <Icon name='user circle' />Log out
                </Menu.Item>
              ) : (
                <Menu.Item name='login' active={activeItem === 'login'} onClick={() => this.handleMenuClick('/login')}>
                  <Icon name='user circle' />Log in/Sign up
                </Menu.Item>
              )}
            </Menu.Menu>
          </Menu>
        </SemHeader>
      </div>
    );
  }
}



      // <Grid textAlign='center' columns={5}>
      //   <Grid.Row>
      //     <Grid.Column>
      //       <Link to="/">
      //         <Button style={{padding: '11px', backgroundColor: 'blue'}} fluid content='Home' icon='home' labelPosition='left' />
      //       </Link>
      //     </Grid.Column>
      //     <Grid.Column>
      //       <Link to="/shop">
      //         <Button style={{padding: '11px', backgroundColor: 'blue'}} fluid content='Shop' icon='grid layout' labelPosition='left' />
      //       </Link>
      //     </Grid.Column>
      //     <Grid.Column>
      //       <Link to="/profile">
      //         <Button style={{padding: '11px', backgroundColor: 'blue'}} fluid content='Profile' icon='user' labelPosition='left' />
      //       </Link>
      //     </Grid.Column>
      //     <Grid.Column>
      //       <Link to="/cart">
      //         <Button style={{padding: '11px', backgroundColor: 'blue'}} fluid content='Cart' icon='cart' labelPosition='left' />
      //       </Link>
      //     </Grid.Column>
      //     <Grid.Column>
      //       {loggedIn ? (
      //         <Button style={{padding: '11px', backgroundColor: 'blue'}} fluid onClick={logOut} content='Log out' icon='user circle' labelPosition='left' />
      //       ) : (
      //         <Link to="/login">
      //           <Button style={{padding: '11px', backgroundColor: 'blue'}} fluid content='Log in/Sign up' icon='user circle' labelPosition='left' />
      //         </Link>
      //       )}
      //     </Grid.Column>
      //   </Grid.Row>
      // </Grid>


export default withRouter(Header);
