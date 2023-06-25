import {
    GET_TAIPEI_SPEED_CAMERA_POSITIONS,
    GET_TAIPEI_SPEED_CAMERA_POSITIONS_SUCCESS,
    GET_TAIPEI_SPEED_CAMERA_POSITIONS_FAILURE,
    RESET_TAIPEI_SPEED_CAMERA_POSITIONS,
} from '../../constants/actionTypes';

export const getTaipeiSpeedCameraPositions = (payload) => ({
    type: GET_TAIPEI_SPEED_CAMERA_POSITIONS,
    payload,
});

export const getTaipeiSpeedCameraPositionsSuccess = (payload) => ({
    type: GET_TAIPEI_SPEED_CAMERA_POSITIONS_SUCCESS,
    payload,
});

export const getTaipeiSpeedCameraPositionsFailure = (payload) => ({
    type: GET_TAIPEI_SPEED_CAMERA_POSITIONS_FAILURE,
    payload,
});

export const resettTaipeiSpeedCameraPositions = (payload) => ({
    type: RESET_TAIPEI_SPEED_CAMERA_POSITIONS,
    payload,
});