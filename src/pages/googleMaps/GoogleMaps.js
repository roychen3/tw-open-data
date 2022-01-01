import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Loader } from '@googlemaps/js-api-loader'
// import { MarkerClusterer } from '@googlemaps/markerclusterer'

import { GOOGLE_MAPS_API_KEY } from '../../constants/googleMapsApiKey'

const StyledMapContainer = styled.div`
wdth: 100%;
height: 400px;
`

const getRandomCharacter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return [
        alphabet[Math.floor(Math.random() * alphabet.length)],
        alphabet[Math.floor(Math.random() * alphabet.length)],
        alphabet[Math.floor(Math.random() * alphabet.length)],
    ].join('')
}

const GoogleMaps = ({ taipeiSpeedCameraPositions }) => {
    const millisecond = Date.now().toString().slice(-3)
    const randomCharacter = getRandomCharacter()
    const mapId = `map-${randomCharacter + millisecond}`
    const [mapElementID] = useState(mapId)

    const [google, setGoogle] = useState(null)
    const [gMap, setGMap] = useState(null)


    useEffect(() => {
        const loader = new Loader({
            apiKey: GOOGLE_MAPS_API_KEY,
            version: 'weekly',
        })

        loader.load().then((res) => {
            setGoogle(res)

            const newMap = new res.maps.Map(document.getElementById(mapElementID), {
                center: { lat: 25.047802296330403, lng: 121.5177953369906 },
                zoom: 12,
            })
            setGMap(newMap)
        })
    }, [])

    useEffect(() => {
        if (google && gMap && taipeiSpeedCameraPositions.length > 0) {
            taipeiSpeedCameraPositions.forEach((item) => {
                const infoWindow = new google.maps.InfoWindow({
                    content: '',
                    disableAutoPan: true,
                })

                const marker = new google.maps.Marker({
                    position: item.location,
                    map: gMap,
                })

                const infoWindowContent = `
                    <div style="color: #ea4335;">
                        <div>${item.features} - 限速${item.speedLimit}<div>
                        <div>${item.address}</div>
                    </div>
                    `

                marker.addListener("click", () => {
                    infoWindow.setContent(infoWindowContent)
                    infoWindow.open(gMap, marker)
                })

                return marker
            })

            // new MarkerClusterer({ markers, newMap })
        }
    }, [google, gMap, taipeiSpeedCameraPositions])

    return (
        <StyledMapContainer id={mapElementID}>

        </StyledMapContainer>
    )
}

GoogleMaps.propTypes = {
    taipeiSpeedCameraPositions: PropTypes.instanceOf(Array).isRequired,
}

export default GoogleMaps
