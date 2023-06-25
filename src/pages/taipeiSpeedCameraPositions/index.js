import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    resettTaipeiSpeedCameraPositions,
} from '../../redux/actions';

import { MuiPageSpinner } from '../../components/muiCircularProgress';
import MuiModal from '../../components/MuiModal';

import useTaipeiSpeedCameraPositions from './useTaipeiSpeedCameraPositions';
import GoogleMaps from './GoogleMaps';
import MessageModal from './MessageModal';

const index = () => {
    const dispatch = useDispatch();

    const {
        taipeiSpeedCameraPositions,
        taipeiSpeedCameraPositionsLoading,
        taipeiSpeedCameraPositionsError,
        getTaipeiSpeedCameraPositionsApi,
        getFakeTaipeiSpeedCameraPositions,
    } = useTaipeiSpeedCameraPositions();

    useEffect(() => {
        getTaipeiSpeedCameraPositionsApi();
        return () => dispatch(resettTaipeiSpeedCameraPositions());
    }, []);

    const [messageModalIsOpen, setMessageModalIsOpen] = useState(false);
    const handaleMessageModalOpen = () => { setMessageModalIsOpen(true); };
    const handaleMessageModalClose = () => { setMessageModalIsOpen(false); };

    // 因為 api 不支援跨網域，且來源只提共csv檔
    // 故多了此步驟
    useEffect(() => {
        if (taipeiSpeedCameraPositionsError !== null && taipeiSpeedCameraPositions.length === 0) {
            console.log('use fake data');
            getFakeTaipeiSpeedCameraPositions();
            handaleMessageModalOpen();
        }
    }, [taipeiSpeedCameraPositionsError]);

    return (
        <div>
            <div className="page-title">臺北市固定測速照相地點</div>
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
        </div>
    );
};

index.propTypes = {

};

export default (index);
