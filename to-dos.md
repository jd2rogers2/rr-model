check article's github
look for other examples
start from scratch using article's steps and then import my files along the way


to dos
readme
clean up css (see below)
edit user info
checkout
more products?
pagination for more products


notes
foreman start -p 3000
heroku run rails console --app="rr-ecommerce"


"build": "bundle exec rails s -p 3001 && cd client && npm start",

old procfile
web: cd client && npm start
api: bundle exec rails s -p 3001


Adding a Stylesheet
This project setup uses Webpack for handling all assets. Webpack offers a custom way of “extending” the concept of import beyond JavaScript. To express that a JavaScript file depends on a CSS file, you need to import the CSS from the JavaScript file:

Button.css
.Button {
  padding: 20px;
}
Button.js
import React, { Component } from 'react';
import './Button.css'; // Tell Webpack that Button.js uses these styles

class Button extends Component {
  render() {
    // You can use them as regular CSS styles
    return <div className="Button" />;
  }
}
