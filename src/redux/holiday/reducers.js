import {
    GET_HOLIDAY,
    GET_HOLIDAY_SUCCESS,
    GET_HOLIDAY_FAILURE,
    RESET_GET_HOLIDAY,
} from '../../constants/actionTypes'

export const initialState = {
    holiday: [],
    holidayError: null,
    holidayLoading: false,
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_HOLIDAY:
            return {
                ...state,
                holidayLoading: true,
            }
        case GET_HOLIDAY_SUCCESS:
            return {
                ...state,
                holiday: action.payload,
                holidayLoading: false,
            }
        case GET_HOLIDAY_FAILURE:
            return {
                ...state,
                holidayError: action.payload,
                holidayLoading: false,
            }
        case RESET_GET_HOLIDAY:
            return {
                ...state,
                holiday: [],
                holidayError: null,
                holidayLoading: false,
            }
        default:
            return state
    }
}

export default reducer