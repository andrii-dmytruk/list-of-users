import React from 'react';
import App from './App';
import './index.css';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
