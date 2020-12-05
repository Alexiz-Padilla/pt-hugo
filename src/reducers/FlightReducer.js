import {
    SET_FLIGHT_ONE_WAY,
    SET_FLIGHT_RETURN
} from '../actionTypes'

const initialState = {
    flight_one_way: '',
    flight_return: ''
}

const FlightReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FLIGHT_ONE_WAY:
            return {
                ...state,
                flight_one_way: action.date
            }
        case SET_FLIGHT_RETURN:
            return {
                ...state,
                flight_return: action.date
            }
        default:
            return state
    }
}

export default FlightReducer