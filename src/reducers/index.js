import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import CounterReducer from './CounterReducer';

const createRootReducer = history => combineReducers({
    CounterReducer,
    router: connectRouter(history),
});

export default createRootReducer;