import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({loggedIn, logOut}) => (
  <div>
    <h1>rails + react model (shopping)</h1>
    <ul>
      <li><Link to="/shop">Shop</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/cart">Cart</Link></li>
      {loggedIn ? (
        <li><button onClick={logOut}>Log Out</button></li>
      ) : (
        <li><Link to="/login">Log In/Sign Up</Link></li>
      )}
    </ul>
  </div>
);

export default Header;
