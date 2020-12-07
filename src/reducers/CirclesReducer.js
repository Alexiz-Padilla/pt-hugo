import {
    SET_CIRCLE,
    UPDATE_CIRCLE,
    UNDO_CIRCLE,
    REDO_CIRCLE
} from '../actionTypes'
import { getSequence } from '../helpers/helpersFunctions'
import _ from 'lodash'

const initialState = {
    circles: {
        1: {
            id: 1,
            x: 0,
            y: 0,
            height: 25,
            width: 25
        }
    },
    undoCircle: [],
    redoCircle: [],
}

const CircleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CIRCLE: {
            const newSequence = getSequence(state.circles, 'id');
            const newObj = {
                id: newSequence,
                x: action.data.x,
                y: action.data.y,
                height: action.data.height,
                width: action.data.width
            }
            return {
                ...state,
                circles: {
                    ...state.circles,
                    [newSequence]: newObj
                },
            }
        }
        case UPDATE_CIRCLE: {
            const circlesExist = state.circles[action.data.id];
            if (circlesExist) {
                return {
                    ...state,
                    circles: {
                        ...state.circles,
                        [action.data.id]: {
                            ...state.circles[action.data.id],
                            height: action.data.height,
                            width: action.data.width
                        }
                    },
                    error: {
                        ...state.error,
                        update: ''
                    }
                }
            }
            return {
                ...state,
                circles: {
                    ...state.circles,
                }
            }
        }
        case UNDO_CIRCLE: {
            const curatedData = state.undoCircle.length > 0 ? state.undoCircle : state.circles
            const newData = undo(curatedData, state.circles)
            return {
                ...state,
                undoCircle: newData
            }
        }
        case REDO_CIRCLE: {
            const curatedData = state.undoCircle.length > 0 ? state.undoCircle : state.circles
            const newData = redo(curatedData)
            return {
                ...state,
                redoCircle: newData
            }
        }
        default:
            return state
    }
}

function undo(data) {
    const curatedData = _.values(data);
    curatedData.pop();
    return curatedData
}

function redo(dataUndo,dataState) {
    const curatedDataUndo = _.values(dataUndo);
    const curatedDataState = _.values(dataState);
    let resultData =  curatedDataUndo;
    return  curatedDataUndo.length + 1 > curatedDataState.length  ? curatedDataState : resultData.push(curatedDataState[curatedDataUndo.length + 1]);
}
export default CircleReducer