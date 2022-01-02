import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Hidden from '@material-ui/core/Hidden'
import { useDispatch } from 'react-redux'

import {
    resettWeather,
} from '../../redux/actions'

import { MuiPageSpinner } from '../../components/muiCircularProgress'
import MuiLabelSelect from '../../components/MuiLabelSelect'
import MuiModal from '../../components/MuiModal'

import useWeather from './useWeather'
import MessageModal from './MessageModal'
import WeatherCard from './WeatherCard'

import TaiwamMap from './map/TaiwamMap'

const StyledForeachContainer = styled.div`
display: flex;

@media (min-width: 600px) {
    flex-direction: column;
}
@media (min-width: 960px){
    flex-direction: row;
`
const StyledCardListContainer = styled.div`
flex-grow: 1;
margin: 2rem 0;
display: flex;
flex-direction: column;

@media (min-width: 600px) {
    flex-direction: row;
    justify-content: center;
}
@media (min-width: 960px){
    flex-wrap: wrap;
    justify-content: start;
    align-content: start;
}
`

const index = () => {
    const dispatch = useDispatch()
    const {
        weatherCountyList,
        weatherAllLocation,
        weatherAllLocationLoading,
        weatherAllLocationError,
        getWeatherApi,
        getFakeWeatherAllLocation,
        creatWeatherCardList,
    } = useWeather()

    const [selectedCounty, setSelectedCounty] = useState('')
    const [weatherCardList, setWeatherCardList] = useState([])
    const [messageModalIsOpen, setMessageModalIsOpen] = useState(false)

    const handaleMessageModalOpen = () => { setMessageModalIsOpen(true) }
    const handaleMessageModalClose = () => { setMessageModalIsOpen(false) }

    useEffect(() => {
        if (weatherCountyList.length > 0) setSelectedCounty(weatherCountyList[0].value)
    }, [weatherCountyList])

    useEffect(() => {
        if (selectedCounty && weatherAllLocation.length > 0) {
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
            getFakeWeatherAllLocation()
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
                    <Hidden xsDown>
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
