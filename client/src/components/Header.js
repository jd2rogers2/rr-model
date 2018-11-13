import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <h1>rails + react model (shopping)</h1>
        <ul>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          {this.props.loggedIn ? (
            <li><button onClick={this.props.logOut}>Log Out</button></li>
          ) : (
            <li><Link to="/login">Log In</Link></li>
          )}
        </ul>
      </div>
    )
  }
}

export default Header;
