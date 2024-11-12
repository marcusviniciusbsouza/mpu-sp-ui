import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './component/App/App';
import Header from './component/App/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import SubHeader from './component/App/Header/SubHeader/SubHeader';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header></Header>
      <SubHeader/>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
