import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import CounterReducer from './CounterReducer';
import TemperatureReducer from './TemperatureReducer';

const createRootReducer = history => combineReducers({
    CounterReducer,
    TemperatureReducer,
    router: connectRouter(history),
});

export default createRootReducer;