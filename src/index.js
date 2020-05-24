import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; //we are linking a css file
import App from './App.js';  //we are importing App from App.js
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // we are rendering the App component to the root id in the index.html so that will be the final site 
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
