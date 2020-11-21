import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

import MuiLabelSelect from '../../components/MuiLabelSelect'
import weatherFakeData from './fakeData.json'
import WeatherCard from './WeatherCard'

const StyledCardListContainer = styled.div`
margin: 2rem 0;

@media (min-width: 576px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
`

const weatherAllLocation = weatherFakeData.cwbopendata.dataset.location

const countyList = weatherAllLocation.map((item) => ({ value: item.locationName, name: item.locationName }))

const index = () => {
    const [selectedCounty, setSelectedCounty] = useState('臺北市')
    const [weatherCardList, setWeatherCardList] = useState([])

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

    useEffect(() => {
        const selectedWeatherData = weatherAllLocation.find((item) => item.locationName === selectedCounty)
        setWeatherCardList(creatWeatherCardList(selectedWeatherData))
    }, [selectedCounty])


    const showWeatherCardList = weatherCardList.map((item, index) => <WeatherCard key={index} data={item} />)

    return (
        <div>
            <div className="page-title">天氣預報</div>
            <MuiLabelSelect
                labelId="county-select-label"
                labelText="county"
                SelectId="county-select"
                value={selectedCounty}
                setValue={setSelectedCounty}
                selectionItems={countyList}
            />
            <StyledCardListContainer>
                {showWeatherCardList}
            </StyledCardListContainer>
        </div>
    )
}

index.propTypes = {

}

export default index
