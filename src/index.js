import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CheckAuth from './Context/CheckAuth';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        {/* <CheckAuth> */}
          <App />
        {/* </CheckAuth> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


