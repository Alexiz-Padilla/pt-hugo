import {
    SET_TEMPERATURE_CELSIUS,
    SET_TEMPERATURE_FAHRENHEIT
} from '../actionTypes'

const initialState = {
    Celsius: "",
    Fahrenheit: ""
}

const TemperatureReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEMPERATURE_CELSIUS:
            return {
                ...state,
                Fahrenheit: Math.round(action.celsius * (9/5) + 32).toString()
            }
        case SET_TEMPERATURE_FAHRENHEIT:
            return {
                ...state,
                Celsius: Math.round((action.fahrenheit - 32) * (5 / 9)).toString()
            }
        default:
            return state
    }
}

export default TemperatureReducer