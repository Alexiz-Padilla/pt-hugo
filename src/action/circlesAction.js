import {
    SET_CIRCLE,
    UPDATE_CIRCLE,
    UNDO_CIRCLE,
    REDO_CIRCLE
} from '../actionTypes'

export const setCircle = (data) => ({
    type: SET_CIRCLE,
    data
})

export const updateCircle = (data) => ({
    type: UPDATE_CIRCLE,
    data
})

export const undoCircle = () => ({
    type: UNDO_CIRCLE,
})

export const redoCircle = () => ({
    type: REDO_CIRCLE,
})
export const setCircleAction = (data) => (dispatch, getState) => new Promise((resolve, reject) => {
    try {
        dispatch(setCircle(data));
        resolve();
    } catch {
        reject();
    }
});

export const updateCircleAction = (data) => (dispatch, getState) => new Promise((resolve, reject) => {
    try {
        dispatch(updateCircle(data));
        resolve();
    } catch {
        reject();
    }
});

export const undoAction = () => (dispatch, getState) => new Promise((resolve, reject) => {
    try {
        dispatch(undoCircle());
        resolve();
    } catch {
        reject();
    }
});
export const redoAction = () => (dispatch, getState) => new Promise((resolve, reject) => {
    try {
        dispatch(redoCircle());
        resolve();
    } catch {
        reject();
    }
});