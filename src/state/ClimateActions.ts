export const SET_TEMPERATURE = 'SET_TEMPERATURE';
export const SET_HUMIDITY = 'SET_HUMIDITY';
export const RESET_TEMPERATURE_MIN_MAX = 'RESET_TEMPERATURE_MIN_MAX';

export type Action = SetTemperatureAction | SetHumidityAction | ResetTemperatureMinMaxAction;

export interface SetTemperatureAction
{
    type: typeof SET_TEMPERATURE;
    payload: number
}

export interface SetHumidityAction
{
    type: typeof SET_HUMIDITY;
    payload: number
}

export interface ResetTemperatureMinMaxAction
{
    type: typeof RESET_TEMPERATURE_MIN_MAX;
}

export function createSetTemperatureAction(temperature: number) : SetTemperatureAction
{
    return { type: SET_TEMPERATURE, payload: temperature };
}

export function createSetHumidityAction(humidity: number) : SetHumidityAction
{
    return { type: SET_HUMIDITY, payload: humidity };
}

export function createResetTemperatureMinMaxAction() : ResetTemperatureMinMaxAction
{
    return { type: RESET_TEMPERATURE_MIN_MAX };
}