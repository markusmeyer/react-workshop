import React from 'react';
import ReactDOM from 'react-dom';

import { sensor } from './lib/Sensor';
import Climate from './components/Climate';

import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import climateReducer from './state/ClimateSlice';

const store = configureStore({reducer: climateReducer});

ReactDOM.render(
    <Provider store={store}>
        <Climate sensor={sensor} />
    </Provider>,
    document.getElementById('root')
);
