import React from 'react';
import ReactDOM from 'react-dom';
import CustomLayout from './components/layout/custom-layout';
import './app.css';
import Theme from '@/components/theme/theme';

ReactDOM.render(
    <>
        <Theme />
        <CustomLayout />
    </>,
    document.getElementById('root')
);
