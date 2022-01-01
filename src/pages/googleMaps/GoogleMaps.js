import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Loader } from '@googlemaps/js-api-loader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import LocationOnIcon from '@material-ui/icons/LocationOn'



import { GOOGLE_MAPS_API_KEY } from '../../constants/googleMapsApiKey'

const StyledMapContainer = styled.div`
wdth: 100%;
height: 80vh;
`

const StyledLocationOnIcon = styled(LocationOnIcon)`
width: 39px !important;
height: 39px !important;
`

const StyledListItem = styled(ListItem)`
color: ${({ theme, ...props }) => {
        console.log('props', props)
        return props ? theme.highlight : theme.mainText
    }};

.MuiListItemIcon-root .MuiSvgIcon-root,
.MuiTypography-colorTextSecondary {
    color: ${({ theme }) => theme.mainText};
}

:hover {
    color: ${({ theme }) => theme.highlight};
    background-color: ${({ theme }) => theme.hover} !important;

    .MuiListItemIcon-root .MuiSvgIcon-root,
    .MuiListItemText-root
    .MuiTypography-colorTextSecondary {
        color: ${({ theme }) => theme.highlight};
    }
}
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

    const [google, setGoogle] = useState(undefined)
    const [gMap, setGMap] = useState(undefined)
    const [activeInfoWindow, setActiveInfoWindow] = useState(undefined)
    const [itemLisComponent, setItemLisComponent] = useState([])
    // const [cameraNo, setCamera] = useState()

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
            const listItems = []

            const infoWindow = new google.maps.InfoWindow({
                content: '',
                disableAutoPan: true,
            })

            taipeiSpeedCameraPositions.forEach((item) => {

                const marker = new google.maps.Marker({
                    position: item.location,
                    map: gMap,
                })

                const infoWindowContent = `
                    <div style="color: #ea4335;">
                        <div>${item.features} - 限速 ${item.speedLimit}<div>
                        <div>${item.address}</div>
                    </div>
                    `

                marker.addListener("click", () => {
                    if (activeInfoWindow) activeInfoWindow.close()
                    infoWindow.setContent(infoWindowContent)
                    infoWindow.open(gMap, marker)
                    setActiveInfoWindow(infoWindow)
                })

                const handleSetMapPosition = (data) => {
                    if (activeInfoWindow) activeInfoWindow.close()
                    gMap.setCenter(data.location)
                    infoWindow.setContent(infoWindowContent)
                    infoWindow.open(gMap, marker)
                    setActiveInfoWindow(infoWindow)
                    // setCamera(data.no)
                }

                listItems.push((
                    <Fragment key={`${item.no}`}>
                        <StyledListItem
                            // isSelected
                            alignItems="flex-start"
                            role={undefined}
                            dense
                            button
                            onClick={() => handleSetMapPosition(item)}
                        // isSelected={cameraNo === item.no}
                        >
                            <ListItemAvatar>
                                <StyledLocationOnIcon />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${item.features} - 限速 ${item.speedLimit}`}
                                secondary={item.address}
                            />
                        </StyledListItem>
                        <Divider variant="inset" component="li" />
                    </Fragment>
                ))
            })

            setItemLisComponent(listItems)
        }
    }, [google, gMap, taipeiSpeedCameraPositions])

    return (
        <>
            <StyledMapContainer id={mapElementID} />
            <List>
                {itemLisComponent}
            </List>
        </>
    )
}
GoogleMaps.propTypes = {
    taipeiSpeedCameraPositions: PropTypes.instanceOf(Array).isRequired,
}

export default GoogleMaps
