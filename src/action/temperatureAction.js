import {
    SET_TEMPERATURE_CELSIUS,
    SET_TEMPERATURE_FAHRENHEIT
} from '../actionTypes'

export const setFahrenheit = (fahrenheit) => ({
    type: SET_TEMPERATURE_FAHRENHEIT,
    fahrenheit
})

export const setCelcius = (celsius) => ({
    type: SET_TEMPERATURE_CELSIUS,
    celsius
})

export const setFahrenheitAction = (fahrenheit) => (dispatch, getState) => new Promise((resolve, reject) => {
    try {
        dispatch(setFahrenheit(fahrenheit));
        resolve();
    } catch {
        reject();
    }
});

export const setCelsiusAction = (celsius) => (dispatch, getState) => new Promise((resolve, reject) => {
    try {
        dispatch(setCelcius(celsius));
        resolve();
    } catch {
        reject();
    }
});