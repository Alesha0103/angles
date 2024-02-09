import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { setupStore } from './store';

import "./App.scss"

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const renderButton = () => (
  <>
    <button className="btn draw-border">Draw Border</button>
  </>
)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* {renderButton()} */}
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
