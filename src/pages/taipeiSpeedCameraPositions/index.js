import React, { useEffect, useState } from 'react'

import { MuiPageSpinner } from '../../components/muiCircularProgress'
import MuiModal from '../../components/MuiModal'

import useTaipeiSpeedCameraPositions from './useTaipeiSpeedCameraPositions'
import GoogleMaps from './GoogleMaps'
import MessageModal from './MessageModal'

const index = () => {
    const {
        taipeiSpeedCameraPositions,
        taipeiSpeedCameraPositionsLoading,
        taipeiSpeedCameraPositionsError,
        getTaipeiSpeedCameraPositionsApi,
        getFakeTaipeiSpeedCameraPositions,
    } = useTaipeiSpeedCameraPositions()

    useEffect(() => {
        getTaipeiSpeedCameraPositionsApi()
    }, [])

    const [messageModalIsOpen, setMessageModalIsOpen] = useState(false)
    const handaleMessageModalOpen = () => { setMessageModalIsOpen(true) }
    const handaleMessageModalClose = () => { setMessageModalIsOpen(false) }

    // 因為 api 不支援跨網域，且來源只提共csv檔
    // 故多了此步驟
    useEffect(() => {
        if (taipeiSpeedCameraPositionsError !== null && taipeiSpeedCameraPositions.length === 0) {
            console.log('use fake data')
            getFakeTaipeiSpeedCameraPositions()
            handaleMessageModalOpen()
        }
    }, [taipeiSpeedCameraPositionsError])

    return (
        <>
            {taipeiSpeedCameraPositionsLoading &&
                <MuiPageSpinner />
            }
            {taipeiSpeedCameraPositionsLoading === false && taipeiSpeedCameraPositions.length > 0 &&
                <GoogleMaps />
            }
            <MuiModal
                open={messageModalIsOpen}
                handaleClose={handaleMessageModalClose}
            >
                <MessageModal />
            </MuiModal>
        </>
    )
}

index.propTypes = {

}

export default (index)
