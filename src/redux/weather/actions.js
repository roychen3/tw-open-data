import {
    GET_WEATHER,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_FAILURE,
    RESET_WEATHER,
} from '../../constants/actionTypes';

export const getWeather = (payload) => ({
    type: GET_WEATHER,
    payload,
});

export const getWeatherSuccess = (payload) => ({
    type: GET_WEATHER_SUCCESS,
    payload,
});

export const getWeatherFailure = (payload) => ({
    type: GET_WEATHER_FAILURE,
    payload,
});

export const resettWeather = (payload) => ({
    type: RESET_WEATHER,
    payload,
});