import {
    GET_TAIPEI_SPEED_CAMERA_POSITIONS,
    GET_TAIPEI_SPEED_CAMERA_POSITIONS_SUCCESS,
    GET_TAIPEI_SPEED_CAMERA_POSITIONS_FAILURE,
    RESET_TAIPEI_SPEED_CAMERA_POSITIONS,
} from '../../constants/actionTypes'
import reducers from './reducers'

describe('weather reducers', () => {
    it('should return the initial state', () => {
        expect(reducers(undefined, {})).toEqual(
            {
                taipeiSpeedCameraPositions: [],
                taipeiSpeedCameraPositionsError: null,
                taipeiSpeedCameraPositionsLoading: false,
            }
        )
    })

    it('should handle get weather', () => {
        ``
        expect(
            reducers([], { type: GET_TAIPEI_SPEED_CAMERA_POSITIONS })
        ).toEqual(
            {
                taipeiSpeedCameraPositionsLoading: true,
            }
        )
    })

    it('should handle get taipeiSpeedCameraPositions success', () => {
        const fakeWeatherCountyList = [
            {
                value: '臺北市',
                name: '臺北市'
            },
            {
                value: '新北市',
                name: '新北市'
            },
        ]
        expect(
            reducers([], {
                type: GET_TAIPEI_SPEED_CAMERA_POSITIONS_SUCCESS,
                payload: fakeWeatherCountyList,
            })
        ).toEqual(
            {
                taipeiSpeedCameraPositions: fakeWeatherCountyList,
                taipeiSpeedCameraPositionsLoading: false,
            }
        )
    })

    it('should handle get taipeiSpeedCameraPositions failure', () => {
        const payload = 'api error message'

        expect(
            reducers([], {
                type: GET_TAIPEI_SPEED_CAMERA_POSITIONS_FAILURE,
                payload,
            })
        ).toEqual(
            {
                taipeiSpeedCameraPositionsError: payload,
                taipeiSpeedCameraPositionsLoading: false,
            }
        )
    })

    it('should handle reset weather', () => {
        expect(
            reducers([], { type: RESET_TAIPEI_SPEED_CAMERA_POSITIONS })
        ).toEqual(
            {
                taipeiSpeedCameraPositions: [],
                taipeiSpeedCameraPositionsError: null,
                taipeiSpeedCameraPositionsLoading: false,
            }
        )
    })
})