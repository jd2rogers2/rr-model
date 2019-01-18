import React, { Component } from 'react';
import { Header as SemHeader, Container, Icon } from 'semantic-ui-react'


class Footer extends Component {
  render(){
    return (
      <SemHeader textAlign='center' as='h2' attached='top' style={{position: 'fixed', bottom: 0, width: '100%'}}>
        <Container textAlign='center'>
          © 2019 @jd2rogers2<a href="https://github.com/jd2rogers2"><Icon link name='github' /></a>
        </Container>
      </SemHeader>
    )
  }
}

export default Footer;
