import {
    GET_TAIPEI_SPEED_CAMERA_POSITIONS,
    GET_TAIPEI_SPEED_CAMERA_POSITIONS_SUCCESS,
    GET_TAIPEI_SPEED_CAMERA_POSITIONS_FAILURE,
    RESET_TAIPEI_SPEED_CAMERA_POSITIONS,
} from '../../constants/actionTypes';

export const initialState = {
    taipeiSpeedCameraPositions: [],
    taipeiSpeedCameraPositionsError: null,
    taipeiSpeedCameraPositionsLoading: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TAIPEI_SPEED_CAMERA_POSITIONS:
            return {
                ...state,
                taipeiSpeedCameraPositionsLoading: true,
            };
        case GET_TAIPEI_SPEED_CAMERA_POSITIONS_SUCCESS:
            return {
                ...state,
                taipeiSpeedCameraPositions: action.payload,
                taipeiSpeedCameraPositionsLoading: false,
            };
        case GET_TAIPEI_SPEED_CAMERA_POSITIONS_FAILURE:
            return {
                ...state,
                taipeiSpeedCameraPositionsError: action.payload,
                taipeiSpeedCameraPositionsLoading: false,
            };
        case RESET_TAIPEI_SPEED_CAMERA_POSITIONS:
            return {
                ...state,
                taipeiSpeedCameraPositions: [],
                taipeiSpeedCameraPositionsError: null,
                taipeiSpeedCameraPositionsLoading: false,
            };
        default:
            return state;
    }
}

export default reducer;
