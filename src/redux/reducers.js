import {combineReducers} from 'redux'

import holiday from './holiday/reducers'
import weather from './weather/reducers'

export default combineReducers({
    holiday,
    weather,
})