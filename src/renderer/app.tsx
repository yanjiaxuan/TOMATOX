import React from 'react';
import ReactDOM from 'react-dom';
import CustomLayout from './components/layout/custom-layout'
import './app.css'
import '@/utils/origins'

ReactDOM.render(
  <React.StrictMode>
    <CustomLayout />
  </React.StrictMode>,
  document.getElementById('root')
);
