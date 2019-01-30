import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Header as SemHeader, Icon, Menu, Form, Dropdown, Button } from 'semantic-ui-react'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '/'
    };
  }

  handleMenuClick = pageName => {
    this.setState({activeItem: pageName});
    this.props.history.push(pageName);
  }

  render(){
    const { activeItem } = this.state;
    return (
      <div style={{width: '95%', display: 'inline-block'}}>
        <SemHeader as='h3'>
          <Menu pointing secondary>
            <Menu.Item name='logo' style={{fontFamily: '"Courier New", Courier, monospace', fontWeight: 'bold'}}>
              ecommerce react & rails
            </Menu.Item>
            <Menu.Item name='/' active={activeItem === '/'  ? true : undefined} onClick={() => this.handleMenuClick('/')}>
              <Icon name='home' />Home
            </Menu.Item>
            <Menu.Item name='/shop' active={activeItem === '/shop' ? true : undefined} onClick={() => this.handleMenuClick('/shop')}>
              <Icon name='grid layout' />Shop
            </Menu.Item>

            {this.props.loggedIn && (
              <Menu.Item name='/cart' active={activeItem === '/cart' ? true : undefined} onClick={() => this.handleMenuClick('/cart')}>
                <Icon name='cart' />Cart
              </Menu.Item>
            )}

            <Menu.Menu position='right'>
              <Menu.Item>
                <Form onSubmit={this.props.getFilteredProducts}>
                  <Form.Input onChange={this.props.handleSearchChange} value={this.props.userInput} action={{ type: 'submit', icon: 'search' }} placeholder='Search...' />
                </Form>
              </Menu.Item>
              <Dropdown active={activeItem === '/profile' ? true : undefined} item icon={<span><Icon name='user' />Account</span>}>
                <Dropdown.Menu>
                  {this.props.loggedIn ? (
                    <Dropdown.Item>
                      <Button.Group basic vertical>
                        <Button onClick={() => this.handleMenuClick('/profile')}>View/edit</Button>
                        <Button>My orders</Button>
                        <Button onClick={this.props.logOut}>Sign out</Button>
                      </Button.Group>
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item onClick={() => this.handleMenuClick('/login')}>Sign up/Sign in</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Menu>
        </SemHeader>
      </div>
    );
  }
}

export default withRouter(Header);
