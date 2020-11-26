import { createSetTemperatureAction, createSetHumidityAction, createResetTemperatureMinMaxAction } from './ClimateActions';
import { climateReducer } from './ClimateReducer';

function createTuple(value: number)
{
    return { value, min: 0, max: 0 };
}

test("sets temperature correctly", () => {
  const state = {
      temperature: createTuple(41),
      humidity: createTuple(0) };
  const newState = climateReducer(state, createSetTemperatureAction(42));
  expect(newState.temperature.value).toEqual(42);
});

test("sets humidity correctly", () => {
    const state = {
        humidity: createTuple(41),
        temperature: createTuple(0) };
    const newState = climateReducer(state, createSetHumidityAction(42));
    expect(newState.humidity.value).toEqual(42);
});

test("resets min and max temperature", () => {
    const state = {
        temperature: {value: 42, min: 40, max: 50},
        humidity: createTuple(0) };
    const newState = climateReducer(state, createResetTemperatureMinMaxAction());
    expect(newState.temperature.min).toEqual(42);
    expect(newState.temperature.max).toEqual(42);
});
