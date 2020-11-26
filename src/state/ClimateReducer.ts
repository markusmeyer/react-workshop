import { Action, SET_TEMPERATURE, SET_HUMIDITY, RESET_TEMPERATURE_MIN_MAX } from './ClimateActions'

interface Tuple
{
  value: number|undefined;
  min: number|undefined;
  max: number|undefined;
}

interface ClimateState
{
    temperature: Tuple;
    humidity: Tuple;
}

function updateTuple(tuple:Tuple, newValue:number) : Tuple
{
    return {
        value: newValue,
        min: !tuple.min || newValue < tuple.min ? newValue : tuple.min,
        max: !tuple.max || newValue > tuple.max ? newValue : tuple.max,
    }
}

export function climateReducer(climateState: ClimateState, action: Action): ClimateState
{
    switch (action.type)
    {
        case SET_TEMPERATURE:
            return {
                ...climateState,
                temperature: updateTuple(climateState.temperature, action.payload)
                };
        case SET_HUMIDITY:
            return {
                ...climateState,
                humidity: updateTuple(climateState.humidity, action.payload)
            };
        case RESET_TEMPERATURE_MIN_MAX:
            return {
                ...climateState,
                temperature: {
                    value: climateState.temperature.value,
                    min: climateState.temperature.value,
                    max: climateState.temperature.value} };
        default:
            return climateState;
    }
}
