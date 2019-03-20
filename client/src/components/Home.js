import React, { Component } from 'react';
import { Segment, Divider, List, Button, Image } from 'semantic-ui-react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

const content = [
  {imageNode: (<Image src="https://vcdn.adnxs.com/p/creative-image/ea/d3/91/08/ead39108-2eb3-4205-9b52-2e6887b1837b.jpg" fluid style={{position: 'inherit', zIndex: '1'}}/>)},
  {imageNode: (<Image src="http://emkath.org/wp-content/uploads/2015/12/3-1000x600.jpg" fluid style={{position: 'fixed', zIndex: '1', top: '100px', maxHeight: '1300px'}}/>),
   subNode: logIn => (
    <div style={{position: 'fixed', zIndex: '2', top: '140px', width: '100%', fontSize: '1.6em', background: 'rgba(255, 255, 255, 0.75)'}}>
      <List verticalAlign='middle'>
        <List.Item>
          <List.Content>
            <List.Header>Welcome to my Rails and ReactJs portfolio app!</List.Header>
            <List.Description>
              This code sample shows my ability to work with
              <Image size='mini' spaced src={'https://i.pinimg.com/originals/f3/47/70/f34770503b90f26ea389f557500ff825.png'} />
               plus <Image size='mini' spaced src={'https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png'} />
               on the frontend and <Image size='mini' spaced src={'https://upload.wikimedia.org/wikipedia/commons/1/16/Ruby_on_Rails-logo.png'} /> as an api.
            </List.Description>
            <List.Description>
              source code: <a href="https://github.com/jd2rogers2/rr-model">https://github.com/jd2rogers2/rr-model</a>
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
      <List verticalAlign='middle'>
        <List.Item>
          <List.Content>
            <List.Header>
              To log in and start clicking around
            </List.Header>
            <List.Description>Account > Sign up</List.Description>
            <List.Description>or click <Button basic color='red' onClick={() => logIn('guest', 'guest')}>here</Button> to use info below</List.Description>
            <List.Description>username: guest</List.Description>
            <List.Description>password: guest</List.Description>
          </List.Content>
        </List.Item>
      </List>
      <List verticalAlign='middle'>
        <List.Item>
          <List.Content>
            <List.Description>
              email: jd2rogers2@gmail.com
            </List.Description>
            <List.Description>
              linkedin: <a href="https://www.linkedin.com/in/jd2rogers2/">https://www.linkedin.com/in/jd2rogers2/</a>
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
    </div>
  )}
];

class Home extends Component {
  render(){
    return (
      <Segment style={{verticalAlign: 'middle', border: 0, boxShadow: 'none', background: 'none', overflow: 'hidden', textAlign: 'center'}}>
        <Divider hidden />
        <Slider infinite={true} autoplay={1000}>
          {content.map((slide, index) => (
            <div key={index} style={{position: 'relative', zIndex: '0'}}>
              {slide.imageNode}
              {slide.subNode && slide.subNode(this.props.logIn)}
            </div>
          ))}
        </Slider>
      </Segment>
    )
  }
}

export default Home;
