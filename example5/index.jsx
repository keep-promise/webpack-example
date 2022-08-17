var React = require('react');
var ReactDOM = require('react-dom');
var style = require('./app.css');

ReactDOM.render(
  <div>
    <h1 className={style.h1}>我是webpack-example5</h1>
    <h2 className="h2">Hello Webpack</h2>
  </div>,
  document.getElementById('app')
);
