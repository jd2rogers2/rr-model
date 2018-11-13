import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  logOut() {}

  render(){
    return (
      <div>
        <h1>rails + react model (shopping)</h1>
        <ul>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><button onClick={this.logOut}>Log Out</button></li>
        </ul>
      </div>
    )
  }
}

export default Header;
