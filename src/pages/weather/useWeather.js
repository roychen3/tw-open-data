import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import {
    getWeather,
    getWeatherSuccess,
    getWeatherFailure,
} from '../../redux/actions'

const useWeather = () => {
    const dispatch = useDispatch()

    const weatherCountyList = useSelector((state) => state.weather.weatherCountyList)
    const weatherAllLocation = useSelector((state) => state.weather.weatherAllLocation)
    const weatherAllLocationError = useSelector((state) => state.weather.weatherAllLocationError)
    const weatherAllLocationLoading = useSelector((state) => state.weather.weatherAllLocationLoading)

    const determineDayDescription = (date) => {
        const determineDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())

        const diffTime = determineDate - currentDate
        const diffDays = diffTime / (1000 * 60 * 60 * 24)

        switch (diffDays) {
            case -2:
                return '前天'
            case -1:
                return '昨天'
            case 0:
                return '今天'
            case 1:
                return '明天'
            case 2:
                return '後天'

            default:
                return ''
        }
    }

    const determineTimeDescription = (hours) => {
        const midnightTime = 0
        const morningTime = 6
        const noonTime = 12
        const eveningTime = 18

        if (morningTime <= hours && hours < noonTime) {
            return '早上'
        } else if (noonTime <= hours && hours < eveningTime) {
            return '下午'
        } else if (eveningTime <= hours) {
            return '晚上'
        } else if (midnightTime <= hours && hours < morningTime) {
            return '凌晨'
        }
    }

    const creatWeatherCardList = (data) => {
        const weatherDescriptionList = []
        const maximumTemperatureList = []
        const minimumTemperatureList = []
        const probabilityOfPrecipitationList = []
        data.weatherElement.forEach((item) => {
            switch (item.elementName) {
                case 'Wx':
                    weatherDescriptionList.push(...item.time)
                    break

                case 'MaxT':
                    maximumTemperatureList.push(...item.time)
                    break

                case 'MinT':
                    minimumTemperatureList.push(...item.time)
                    break

                case 'PoP':
                    probabilityOfPrecipitationList.push(...item.time)
                    break

                default:
                    break
            }
        })

        const weatherCardList = [{}, {}, {}]

        weatherDescriptionList.forEach((item, index) => {
            const weatherDescriptionName = item.parameter.parameterName
            const weatherDescriptionCode = item.parameter.parameterValue
            weatherCardList[index].weatherDescriptionName = weatherDescriptionName
            weatherCardList[index].weatherDescriptionCode = weatherDescriptionCode

            const startTime = new Date(item.startTime)
            const endTime = new Date(item.endTime)
            const weatherPeriodTime = `${determineDayDescription(startTime)}${determineTimeDescription(startTime.getHours())} 至 ${determineDayDescription(endTime)}${determineTimeDescription(endTime.getHours())}`
            weatherCardList[index].weatherPeriodTime = weatherPeriodTime
        })

        maximumTemperatureList.forEach((item, index) => {
            const value = item.parameter.parameterName
            const unit = item.parameter.parameterUnit === 'C' ? '°C' : '°F'
            weatherCardList[index].maximumTemperature = `${value}${unit}`
        })

        minimumTemperatureList.forEach((item, index) => {
            const value = item.parameter.parameterName
            const unit = item.parameter.parameterUnit === 'C' ? '°C' : '°F'
            weatherCardList[index].minimumTemperature = `${value}${unit}`
        })

        probabilityOfPrecipitationList.forEach((item, index) => {
            const value = item.parameter.parameterName
            const unit = item.parameter.parameterUnit === '百分比' ? '%' : ''
            weatherCardList[index].probabilityOfPrecipitation = `${value}${unit}`
        })

        return weatherCardList
    }

    const getWeatherApi = () => {
        dispatch(getWeather())

        axios.get('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=rdec-key-123-45678-011121314&format=JSON')
            .then((resultData) => {
                const allLocationData = resultData.data.cwbopendata.dataset.location
                const countyList = allLocationData.map((item) => ({ value: item.locationName, name: item.locationName }))
                dispatch(getWeatherSuccess({
                    weatherCountyList: countyList,
                    weatherAllLocation: allLocationData,
                }))
            })
            .catch((err) => {
                dispatch(getWeatherFailure(err))
            })
    }

    return {
        weatherCountyList,
        weatherAllLocation,
        weatherAllLocationError,
        weatherAllLocationLoading,
        getWeatherApi,
        determineDayDescription,
        determineTimeDescription,
        creatWeatherCardList
    }
}

useWeather.propTypes = {

}

export default useWeather