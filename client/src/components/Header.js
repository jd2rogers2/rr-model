import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Header as SemHeader, Icon, Image, Container, Menu, Form } from 'semantic-ui-react'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '/',
      userInput: ''
    };
  }

  handleMenuClick = pageName => {
    this.setState({activeItem: pageName});
    this.props.history.push(pageName);
  }

  handleSearchChange = event => {
    this.setState({ userInput: event.target.value });
  }

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
                <Form onSubmit={() => this.props.getFilteredProducts(this.state.userInput)}>
                  <Form.Input onChange={this.handleSearchChange} action={{ type: 'submit', icon: 'search' }} placeholder='Search...' />
                </Form>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </SemHeader>
      </div>
    );
  }
}

export default withRouter(Header);
