import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'

import { GOOGLE_MAPS_API_KEY } from '../../constants/googleMapsApiKey'

const Marker = ({ text }) => (
    <div>
        {text}
    </div>
)
Marker.propTypes = {
    text: PropTypes.string.isRequired,
}

const index = () => {
    return (
        <div style={{ height: '400px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                defaultZoom={15}
                defaultCenter={{ lat: 25.0824497, lng: 121.5074374 }}
            >
                <Marker lat={25.0824497} lng={121.5074374} text={'A'} />
            </GoogleMapReact>
        </div>
    )
}

index.propTypes = {

}

export default index
