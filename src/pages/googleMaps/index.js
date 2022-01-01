import React, { useEffect } from 'react'

import useTaipeiSpeedCameraPositions from './useTaipeiSpeedCameraPositions'
// import GoogleMapReact from './GoogleMapReact'
// import ReactGoogleMap from './ReactGoogleMap'
import GoogleMaps from './GoogleMaps'

const index = () => {
    const {
        taipeiSpeedCameraPositions,
        taipeiSpeedCameraPositionsError,
        getTaipeiSpeedCameraPositionsApi,
        getFakeTaipeiSpeedCameraPositions,
    } = useTaipeiSpeedCameraPositions()

    useEffect(() => {
        getTaipeiSpeedCameraPositionsApi()
        // return () => {
        //     cleanup
        // }
    }, [])

    // 因為 api 不支援跨網域，且來源只提共csv檔
    // 故多了此步驟
    useEffect(() => {
        if (taipeiSpeedCameraPositionsError !== null && taipeiSpeedCameraPositions.length === 0) {
            console.log('use fake data')
            getFakeTaipeiSpeedCameraPositions()
            // handaleMessageModalOpen()
        }
    }, [taipeiSpeedCameraPositionsError])

    return (
        <>
            {/* <GoogleMapReact /> */}
            {/* <ReactGoogleMap taipeiSpeedCameraPositions={taipeiSpeedCameraPositions} /> */}
            <GoogleMaps taipeiSpeedCameraPositions={taipeiSpeedCameraPositions} />
        </>
    )
}

index.propTypes = {

}

export default (index)
