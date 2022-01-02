import {combineReducers} from 'redux'

import holiday from './holiday/reducers'
import weather from './weather/reducers'
import taipeiSpeedCameraPositions from './taipeiSpeedCameraPositions/reducers'

export default combineReducers({
    holiday,
    weather,
    taipeiSpeedCameraPositions,
})