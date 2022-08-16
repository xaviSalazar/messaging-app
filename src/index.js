import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import redux from './redux/index';
import { HashRouter } from 'react-router-dom';

const store = createStore(redux, compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HashRouter>
      <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
