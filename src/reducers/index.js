import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import CounterReducer from './CounterReducer';
import TemperatureReducer from './TemperatureReducer';
import FlightReducer from './FlightReducer';
import CrudReducer from "./CrudReducer";
import CircleReducer from "./CirclesReducer";

const createRootReducer = history => combineReducers({
    CircleReducer,
    CounterReducer,
    TemperatureReducer,
    FlightReducer,
    CrudReducer,
    router: connectRouter(history),
});

export default createRootReducer;