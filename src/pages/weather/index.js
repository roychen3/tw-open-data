import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Hidden from '@material-ui/core/Hidden'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import {
    getWeather,
    getWeatherSuccess,
    getWeatherFailure,
    resettWeather,
} from '../../redux/actions'

import { MuiPageSpinner } from '../../components/muiCircularProgress'
import MuiLabelSelect from '../../components/MuiLabelSelect'
import MuiModal from '../../components/MuiModal'
import MessageModal from './MessageModal'
import WeatherCard from './WeatherCard'

import TaiwamMap from './map/TaiwamMap'

const StyledForeachContainer = styled.div`
display: flex;
`
const StyledCardListContainer = styled.div`
flex-grow: 1;
margin: 2rem 0;
display: flex;
flex-direction: column;

@media (min-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
@media (min-width: 960px){
    justify-content: start;
    align-content: start;
    // max-width: 330px;
}
`

const index = () => {
    const dispatch = useDispatch()
    const weatherCountyList = useSelector((state) => state.weather.weatherCountyList)
    const weatherAllLocation = useSelector((state) => state.weather.weatherAllLocation)
    const weatherAllLocationError = useSelector((state) => state.weather.weatherAllLocationError)
    const weatherAllLocationLoading = useSelector((state) => state.weather.weatherAllLocationLoading)

    const [selectedCounty, setSelectedCounty] = useState('臺北市')
    const [weatherCardList, setWeatherCardList] = useState([])
    const [messageModalIsOpen, setMessageModalIsOpen] = useState(false)

    const handaleMessageModalOpen = () => { setMessageModalIsOpen(true) }
    const handaleMessageModalClose = () => { setMessageModalIsOpen(false) }

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

    useEffect(() => {
        if (weatherAllLocation.length > 0) {
            const selectedWeatherData = weatherAllLocation.find((item) => item.locationName === selectedCounty)
            setWeatherCardList(creatWeatherCardList(selectedWeatherData))
        }
    }, [selectedCounty, weatherAllLocation])

    useEffect(() => {
        getWeatherApi()

        return () => {
            dispatch(resettWeather())
        }
    }, [])

    useEffect(() => {
        if (weatherAllLocationError !== null) {
            handaleMessageModalOpen()
        }
    }, [weatherAllLocationError])

    const showWeatherCardList = weatherCardList.map((item, index) => <WeatherCard key={index} data={item} />)

    return (
        <div>
            <div className="page-title">天氣預報</div>
            {weatherAllLocationLoading &&
                <MuiPageSpinner />
            }
            <MuiLabelSelect
                labelId="county-select-label"
                labelText="county"
                SelectId="county-select"
                value={selectedCounty}
                setValue={setSelectedCounty}
                selectionItems={weatherCountyList}
            />
            {weatherAllLocationLoading === false && weatherCardList.length > 0 &&
                <StyledForeachContainer>
                    <StyledCardListContainer>
                        {showWeatherCardList}
                    </StyledCardListContainer>
                    <Hidden smDown>
                        <TaiwamMap selectedCounty={selectedCounty} setCounty={setSelectedCounty} />
                    </Hidden>
                </StyledForeachContainer>
            }
            <MuiModal
                open={messageModalIsOpen}
                handaleClose={handaleMessageModalClose}
            >
                <MessageModal />
            </MuiModal>
        </div>
    )
}

index.propTypes = {

}

export default index
