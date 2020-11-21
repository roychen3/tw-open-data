import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
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

const StyledCardListContainer = styled.div`
margin: 2rem 0;

@media (min-width: 576px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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

    const determineDayDescription = (day) => {
        const currentDay = new Date(Date.now()).getDay()
        const sunday = 0
        const saturday = 6

        if (currentDay === sunday && day === saturday && day > currentDay) {
            return '昨日'
        } else if (currentDay > day) {
            return '昨日'
        } else if (day > currentDay) {
            return '明日'
        } else {
            return '今日'
        }
    }

    const determineTimeDescription = (hours) => {
        const midnightTime = 0
        const morningTime = 6
        const noonTime = 12
        const eveningTime = 18

        if (hours >= morningTime && hours < noonTime) {
            return '早上'
        } else if (hours >= noonTime && hours < eveningTime) {
            return '下午'
        } else if (hours >= eveningTime) {
            return '晚上'
        } else if (hours >= midnightTime && hours < morningTime) {
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
            const weatherPeriodTime = `${determineDayDescription(startTime.getDay())}${determineTimeDescription(startTime.getHours())} 至 ${determineDayDescription(endTime.getDay())}${determineTimeDescription(endTime.getHours())}`
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
            <TaiwamMap />
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
                <StyledCardListContainer>
                    {showWeatherCardList}
                </StyledCardListContainer>
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
