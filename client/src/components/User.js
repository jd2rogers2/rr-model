import React from 'react';
import { Redirect } from "react-router-dom";

const User = ({loggedIn, location, username}) => !loggedIn ? (
  <Redirect
    to={{
      pathname: "/login",
      state: { from: location }
    }}
  />
) : (
  <h3>Welcome {username}!</h3>
);

export default User;
