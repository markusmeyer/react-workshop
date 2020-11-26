import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from '../index';
import { sensor } from '../lib/Sensor';

export interface Tuple
{
  value: number|undefined;
  min: number|undefined;
  max: number|undefined;
}

export interface ClimateState
{
    temperature: Tuple;
    humidity: Tuple;
    updating: boolean;
    errorOccurred: boolean;
}

export function createReloadThunk(): AppThunk
{
  return async dispatch =>
  {
    dispatch(setUpdating(true));
    dispatch(setErrorOccurred(false));
    try
    {
        const [temperature, humidity] = await Promise.all([
            sensor.getTemperature(),
            sensor.getHumidity()]);
        dispatch(setTemperature(temperature));
        dispatch(setHumidity(humidity));
    }
    catch (ex)
    {
        dispatch(setErrorOccurred(true));
    }
    dispatch(setUpdating(false));
};
}

const climateSlice = createSlice({
    name: 'climate',
    initialState: {
        temperature: {value: undefined, min: undefined, max: undefined},
        humidity: {value: undefined, min: undefined, max: undefined},
        updating: false,
        errorOccurred: false
    } as ClimateState,
    reducers: {
        setTemperature: (state: ClimateState, action: {payload:number}) =>
        {
            state.temperature = updateTuple(state.temperature, action.payload);
        },
        setHumidity: (state: ClimateState, action: {payload:number}) =>
        {
            state.humidity = updateTuple(state.humidity, action.payload);
        },
        resetTemperatureMinMax: (state: ClimateState) =>
        {
            state.temperature.min = state.temperature.value;
            state.temperature.max = state.temperature.value;
        },
        resetHumidityMinMax: (state: ClimateState) =>
        {
            state.humidity.min = state.humidity.value;
            state.humidity.max = state.humidity.value;
        },
        setUpdating: (state: ClimateState, action: {payload:boolean}) =>
        {
            state.updating = action.payload;
        },
        setErrorOccurred: (state: ClimateState, action: {payload:boolean}) =>
        {
            state.errorOccurred = action.payload;
        }
    }
});

function updateTuple(tuple:Tuple, newValue:number) : Tuple
{
    return {
        value: newValue,
        min: !tuple.min || newValue < tuple.min ? newValue : tuple.min,
        max: !tuple.max || newValue > tuple.max ? newValue : tuple.max,
    }
}

export const selectTemperature = (state:ClimateState) => state.temperature;

export const selectHumidity = (state:ClimateState) => state.humidity;

export const selectUpdating = (state:ClimateState) => state.updating;

export const selectErrorOccurred = (state:ClimateState) => state.errorOccurred;

export const {setTemperature, setHumidity, resetTemperatureMinMax, resetHumidityMinMax, setUpdating, setErrorOccurred} =
    climateSlice.actions;

export default climateSlice.reducer;