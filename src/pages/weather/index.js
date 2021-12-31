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
    const {
        weatherCountyList,
        weatherAllLocation,
        weatherAllLocationLoading,
        weatherAllLocationError,
        getWeatherApi,
        creatWeatherCardList,
    } = useWeather()

    const [selectedCounty, setSelectedCounty] = useState('臺北市')
    const [weatherCardList, setWeatherCardList] = useState([])
    const [messageModalIsOpen, setMessageModalIsOpen] = useState(false)

    const handaleMessageModalOpen = () => { setMessageModalIsOpen(true) }
    const handaleMessageModalClose = () => { setMessageModalIsOpen(false) }

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
