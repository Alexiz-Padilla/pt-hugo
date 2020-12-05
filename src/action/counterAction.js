import {
  SET_COUNTER,
} from '../actionTypes'

export const setCounter= (count) => ({
  type: SET_COUNTER,
  count
})

export const setCounterAction = (count) => (dispatch, getState) => new Promise((resolve, reject) => {
    try {
        dispatch(setCounter(count));
        resolve();
    } catch{
        reject();
    }
});
