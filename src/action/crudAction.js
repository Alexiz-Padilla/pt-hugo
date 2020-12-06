import {
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
    SEARCH_USER,
    SEARCH_USER_ERROR
} from '../actionTypes'

export const getUser = () => ({
    type: GET_USER,
});
export const getUserSuccess = () => ({
    type: GET_USER_SUCCESS,
});
export const getUserError = () => ({
    type: GET_USER_ERROR,
});

export const createUser = () => ({
    type: ADD_USER,
});
export const createUserSuccess = (data) => ({
    type: ADD_USER_SUCCESS,
    data
});
export const createUserError = (error) => ({
    type: ADD_USER_ERROR,
    error
});

export const updateUser = () => ({
    type: UPDATE_USER,
});
export const updateUserSuccess = (user, data) => ({
    type: UPDATE_USER_SUCCESS,
    user,
    data 
});
export const updateUserError = (error) => ({
    type: UPDATE_USER_ERROR,
    error
});

export const deleteUser = (error) => ({
    type: DELETE_USER,
    error
});
export const deleteUserSuccess = (user) => ({
    type: DELETE_USER_SUCCESS,
    user
});
export const deleteUserError = () => ({
    type: DELETE_USER_ERROR,
});
export const searchUser = (search) => ({
    type: SEARCH_USER,
    search
})
export const searchUserError = (error) => ({
    type: SEARCH_USER_ERROR,
    error
})

export const getUserAction = () => (dispatch, getState) => new Promise((resolve, reject) => {
    try {
        dispatch(getUser());
        dispatch(getUserSuccess());
        resolve();
    } catch {
        dispatch(getUserError('error'));
        reject();
    }
});
export const createUserAction = (data) => (dispatch, getState) => new Promise((resolve, reject) => {
    try {
        console.log(data)
        dispatch(createUser());
        dispatch(createUserSuccess({Surname: data.Surname, Name: data.Name}));
        resolve();
    } catch {
        dispatch(createUserError('error'));
        reject();
    }
});
export const updateUserAction = (user, data) => (dispatch, getState) => new Promise((resolve, reject) => {
    try {
        dispatch(updateUser());
        dispatch(updateUserSuccess(user, {Surname: data.Surname, Name: data.Name}));
        resolve();
    } catch {
        dispatch(updateUserError('error'));
        reject();
    }
});
export const deleteUserAction = (user) => (dispatch, getState) => new Promise((resolve, reject) => {
    try {
        dispatch(deleteUser());
        dispatch(deleteUserSuccess(user));
        resolve();
    } catch {
        dispatch(deleteUserError('error'));
        reject();
    }
});

export const searchUserAction = (search) => (dispatch, getState) => new Promise((resolve, reject) => {
    try {
        dispatch(searchUser(search));
        resolve();
    } catch {
        dispatch(searchUserError('error'));
        reject();
    }
});

