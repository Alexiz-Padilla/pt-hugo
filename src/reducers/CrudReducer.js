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
import { getSequence } from '../helpers/helpersFunctions'
import _ from 'lodash'

const initialState = {
    users: {
        1: {
            value: 1,
            label: 'Padilla , Alexis',
        }
    },
    filterData: [],
    error: {
        get: '',
        post: '',
        delete: '',
        update: '',
        search: ''
    }
}

const CounterReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                // users: action.data -- Es caso hipotetico de datos retornados de la db
                error: {
                    ...state.error,
                    get: ''
                }
            }
        case GET_USER_ERROR:
            return {
                ...state,
                error: {
                    ...state.error,
                    get: action.error
                }
            }
        case ADD_USER:
            return {
                ...state,
            }
        case ADD_USER_SUCCESS: {
            const newSequence = getSequence(state.users, 'value');
            const newObj = {
                value: newSequence,
                label: `${action.data.Surname} , ${action.data.Name}`
            }
            return {
                ...state,
                users: {
                    ...state.users,
                    [newSequence]: newObj
                },
                error: {
                    ...state.error,
                    create: ''
                }
            }
        }
        case ADD_USER_ERROR:
            return {
                ...state,
                error: {
                    ...state.error,
                    post: action.error
                }
            }
        case UPDATE_USER:
            return {
                ...state,
            }
        case UPDATE_USER_SUCCESS: {
            const userExist = state.users[action.user];
            if (userExist) {
                return {
                    ...state,
                    users: {
                        ...state.users,
                        [action.user]: {
                            ...state.users[action.user],
                            label: `${action.data.Surname} , ${action.data.Name}`
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
                users: {
                    ...state.users,
                },
                error: {
                    ...state.error,
                    update: 'No existe usuario'
                }
            }
        }
        case UPDATE_USER_ERROR:
            return {
                ...state,
                error: {
                    ...state.error,
                    update: action.error
                }
            }
        case DELETE_USER:
            return {
                ...state,
            }
        case DELETE_USER_SUCCESS: {
            delete state.users[action.user];
            return {
                ...state,
                users: {
                    ...state.users,
                },
                error: {
                    ...state.error,
                    delete: ''
                }
            }
        }
        case DELETE_USER_ERROR:
            return {
                ...state,
                error: {
                    ...state.error,
                    delete: action.error
                }
            }
        case SEARCH_USER: {
            const curatedData = findUsers(action.search,state.users)
            return {
                ...state,
                filterData: curatedData,
                error: {
                    ...state.error,
                    search: ''
                }
            }
        }
        case SEARCH_USER_ERROR:
            return {
                ...state,
                error: {
                    ...state.error,
                    search: action.error
                }
            }
        default:
            return state
    }
}

function findUsers(search, data) {
    const curatedData = _.values(data);
    const curatedSearch = search.toLowerCase();
    return curatedData.filter(
      (item) => {
        const splitObject =  item.label.split(' , ')[0];
        let curatedValue = splitObject.toLowerCase()
        curatedValue = _.deburr(curatedValue)

        return curatedValue.includes(curatedSearch)
      },
    )
}

export default CounterReducer