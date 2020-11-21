import {
    GET_WEATHER,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_FAILURE,
    RESET_WEATHER,
} from '../../constants/actionTypes'

export const initialState = {
    weatherCountyList: [],
    weatherAllLocation: [],
    weatherAllLocationError: null,
    weatherAllLocationLoading: false,
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_WEATHER:
            return {
                ...state,
                weatherAllLocationLoading: true,
            }
        case GET_WEATHER_SUCCESS:
            return {
                ...state,
                weatherCountyList: action.payload.weatherCountyList,
                weatherAllLocation: action.payload.weatherAllLocation,
                weatherAllLocationLoading: false,
            }
        case GET_WEATHER_FAILURE:
            return {
                ...state,
                weatherAllLocationError: action.payload,
                weatherAllLocationLoading: false,
            }
        case RESET_WEATHER:
            return {
                ...state,
                weatherCountyList: [],
                weatherAllLocation: [],
                weatherAllLocationError: null,
                weatherAllLocationLoading: false,
            }
        default:
            return state
    }
}

export default reducer
