import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import BeachAccessIcon from '@material-ui/icons/BeachAccess'

const StyledCard = styled(Card)`
color: ${({ theme }) => theme.mainText} !important;
background-color: ${({ theme }) => theme.secondBackground} !important;
margin: 1px;
`
const StyledCardContent = styled(CardContent)`
text-align: center;
padding: 1rem !important;

@media (min-width: 992px){
    padding: 2rem !important;
}
`
const StyledPeriodTime = styled.div`
font-size: small;
margin-top: 1rem;
`
const StyledDescriptionName = styled.div`
font-size: small;
margin: 2rem 0;
`
const StyledTemperature = styled.div`
margin: 2rem 0;
`
const StyledProbabilityOfPrecipitation = styled.div`
margin-bottom: 1rem;
display: flex;
justify-content: center;
align-items: center;
`
const StyledProbabilityOfPrecipitationText = styled.div`
margin-left: 1rem
`

const WeatherCard = ({ data }) => {
    console.log(data)
    return (
        <StyledCard variant="outlined">
            <StyledCardContent>
                <StyledPeriodTime>
                    {data.weatherPeriodTime}
                </StyledPeriodTime>
                <StyledDescriptionName>
                    {data.weatherDescriptionName}
                </StyledDescriptionName>
                <StyledTemperature>
                    {`${data.maximumTemperature} - ${data.minimumTemperature}`}
                </StyledTemperature>
                <StyledProbabilityOfPrecipitation>
                    <BeachAccessIcon />
                    <StyledProbabilityOfPrecipitationText>
                        {data.probabilityOfPrecipitation}
                    </StyledProbabilityOfPrecipitationText>
                </StyledProbabilityOfPrecipitation>
            </StyledCardContent>
        </StyledCard>
    )
}

WeatherCard.propTypes = {
    data: PropTypes.instanceOf(Array).isRequired
}

export default WeatherCard
