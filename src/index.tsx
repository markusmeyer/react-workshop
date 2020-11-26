import React from 'react';
import ReactDOM from 'react-dom';

import { sensor } from './lib/Sensor';
import Climate from './components/Climate';

import './index.css';
import { Provider } from 'react-redux';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import climateReducer from './state/ClimateSlice';

export const store = configureStore({reducer: climateReducer});

ReactDOM.render(
    <Provider store={store}>
        <Climate sensor={sensor} />
    </Provider>,
    document.getElementById('root')
);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,    // what the thunk returns (by default void)
  RootState,     // type of the full store, derived above
  unknown,       // extra argument, we don't need that
  Action<string> // type of a Redux action (string is the type)
>;