import React from 'react'
import PropTypes from 'prop-types'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import { GOOGLE_MAPS_API_KEY } from '../../constants/googleMapsApiKey'

const Maps = withScriptjs(withGoogleMap(({ taipeiSpeedCameraPositions }) => {
    const markers = taipeiSpeedCameraPositions.map((item) => (
        <Marker key={item.no} position={item.location} />
    ))
    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 25.04021, lng: 121.528946 }}
        >
            {markers}
        </GoogleMap>
    )
}))



const ReactGoogleMap = ({ taipeiSpeedCameraPositions }) => {
    return (
        <Maps
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            taipeiSpeedCameraPositions={taipeiSpeedCameraPositions}
        />
    )
}
ReactGoogleMap.propTypes = {
    taipeiSpeedCameraPositions: PropTypes.instanceOf(Array).isRequired,
}

export default (ReactGoogleMap)
