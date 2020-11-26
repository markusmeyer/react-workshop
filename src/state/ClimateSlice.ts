import { createSlice } from '@reduxjs/toolkit'

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
}

const climateSlice = createSlice({
    name: 'climate',
    initialState: {
        temperature: {value: undefined, min: undefined, max: undefined},
        humidity: {value: undefined, min: undefined, max: undefined}
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

export const selectTemperature = (state:ClimateState) => {
    console.log(state);
    return state.temperature
};

export const selectHumidity = (state:ClimateState) => state.humidity;

export const {setTemperature, setHumidity, resetTemperatureMinMax, resetHumidityMinMax} = climateSlice.actions;

export default climateSlice.reducer;