import {
    SET_FLIGHT_RETURN,
    SET_FLIGHT_ONE_WAY
  } from '../actionTypes'
  
  export const setFlightOneWay= (date) => ({
    type: SET_FLIGHT_ONE_WAY,
    date
  })
  export const setFlightReturn= (date) => ({
    type: SET_FLIGHT_RETURN,
    date
  })
  export const setFlightOneWayAction = (date) => (dispatch, getState) => new Promise((resolve, reject) => {
      try {
          dispatch(setFlightOneWay(date));
          resolve();
      } catch{
          reject();
      }
  });
  export const setFlightReturnAction = (date) => (dispatch, getState) => new Promise((resolve, reject) => {
    try {
        dispatch(setFlightReturn(date));
        resolve();
    } catch{
        reject();
    }
});
