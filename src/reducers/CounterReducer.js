import {
    SET_COUNTER,
  } from '../actionTypes'
  
  const initialState = {
    count: 0,
  }
  
  const CounterReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_COUNTER:
        return {
          ...state,
          count: action.count + 1
        }
      default:
        return state
    }
  }
  
  export default CounterReducer