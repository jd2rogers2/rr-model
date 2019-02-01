import React from 'react';
import { Header as SemHeader, Container, Icon } from 'semantic-ui-react'

const Footer = () => (
  <SemHeader textAlign='center' as='h2' attached='top' style={{bottom: 0, width: '100%', marginLeft: 0, position: 'fixed'}}>
    <Container textAlign='center'>
      © 2019 @jd2rogers2<a href="https://github.com/jd2rogers2"><Icon link name='github' /></a>
    </Container>
  </SemHeader>
);

export default Footer;
