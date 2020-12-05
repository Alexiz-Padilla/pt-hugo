import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import CounterReducer from './CounterReducer';
import TemperatureReducer from './TemperatureReducer';
import FlightReducer from './FlightReducer';

const createRootReducer = history => combineReducers({
    CounterReducer,
    TemperatureReducer,
    FlightReducer,
    router: connectRouter(history),
});

export default createRootReducer;