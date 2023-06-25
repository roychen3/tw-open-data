import {
    GET_HOLIDAY,
    GET_HOLIDAY_SUCCESS,
    GET_HOLIDAY_FAILURE,
    RESET_HOLIDAY,
} from '../../constants/actionTypes';

export const getHoliday = (payload) => ({
    type: GET_HOLIDAY,
    payload,
});

export const getHolidaySuccess = (payload) => ({
    type: GET_HOLIDAY_SUCCESS,
    payload,
});

export const getHolidayFailure = (payload) => ({
    type: GET_HOLIDAY_FAILURE,
    payload,
});

export const resetHoliday = (payload) => ({
    type: RESET_HOLIDAY,
    payload,
});