import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    // fetch user's attributes
  }

  render(){
    return (
      <h1>user page</h1>
    )
  }
}

export default User;
