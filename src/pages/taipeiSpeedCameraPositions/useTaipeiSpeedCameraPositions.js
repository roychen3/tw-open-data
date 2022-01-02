import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import {
    getTaipeiSpeedCameraPositions,
    getTaipeiSpeedCameraPositionsSuccess,
    getTaipeiSpeedCameraPositionsFailure,
} from '../../redux/actions'
// import taipeiSpeedCameraPositionsFakeData from './devFakeData.json'
import fakeMapsInformation from './fakeMapsInformation.json'

// import { GOOGLE_MAPS_API_KEY } from '../../constants/googleMapsApiKey'
// // 用太多要繳費給 Google，先註解掉
// const googleMapsClient = require('@google/maps').createClient({
//     key: GOOGLE_MAPS_API_KEY,
//     Promise: Promise
// })

const useTaipeiSpeedCameraPositions = () => {
    const dispatch = useDispatch()

    const taipeiSpeedCameraPositions = useSelector((state) => state.taipeiSpeedCameraPositions.taipeiSpeedCameraPositions)
    const taipeiSpeedCameraPositionsError = useSelector((state) => state.taipeiSpeedCameraPositions.taipeiSpeedCameraPositionsError)
    const taipeiSpeedCameraPositionsLoading = useSelector((state) => state.taipeiSpeedCameraPositions.taipeiSpeedCameraPositionsLoading)

    // // 用太多要繳費給 Google，先註解掉
    // const getLatitudeAndLongitude = (address) => (
    //     googleMapsClient.geocode({ address })
    //         .asPromise()
    //         .then((response) => {
    //             return ({
    //                 formatted_address: response.json.results[0].formatted_address,
    //                 location: response.json.results[0].geometry.location,
    //             })
    //         })
    //         .catch((err) => {
    //             return { errorMessage: err.message }
    //         })
    // )

    // // 用太多要繳費給 Google，先註解掉
    // const creatMapsInformation = async (taipeiSpeedCameraPositionsData) => (
    //     await Promise.all(taipeiSpeedCameraPositionsData.map(async (item) => {
    //         const { setRoad,
    //             setPosition,
    //         } = item
    //         const address = `臺北市 ${setRoad} ${setPosition}`
    //         const latitudeAndLongitude = await getLatitudeAndLongitude(address)
    //         return {
    //             ...item,
    //             address,
    //             ...latitudeAndLongitude,
    //         }
    //     }))
    // )

    const getTaipeiSpeedCameraPositionsApi = () => {
        dispatch(getTaipeiSpeedCameraPositions())

        axios.get('https://data.taipei/api/getDatasetInfo/downloadResource?id=745b8808-061f-4f5b-9a62-da1590c049a9&rid=5012e8ba-5ace-4821-8482-ee07c147fd0a')
            .then(() => {
                // 因為 api 不支援跨網域
                // 且來源只提供 csv 檔，還要轉乘 json
                // 永遠跑不到這裡

                // 用太多要繳費給 Google，先註解掉
                // const latitudeAndLongitudeList = await creatMapsInformation(taipeiSpeedCameraPositionsFakeData)
                // dispatch(getTaipeiSpeedCameraPositionsSuccess(latitudeAndLongitudeList))
            })
            .catch((err) => {
                dispatch(getTaipeiSpeedCameraPositionsFailure(err))
            })
    }

    const getFakeTaipeiSpeedCameraPositions = async () => {
        // // 用太多要繳費給 Google，先註解掉
        // const latitudeAndLongitudeList = await creatMapsInformation(taipeiSpeedCameraPositionsFakeData)

        // creatMapsInformation 產生的資料
        const latitudeAndLongitudeList = fakeMapsInformation

        dispatch(getTaipeiSpeedCameraPositionsSuccess(latitudeAndLongitudeList))
    }

    return {
        taipeiSpeedCameraPositions,
        taipeiSpeedCameraPositionsError,
        taipeiSpeedCameraPositionsLoading,
        // getLatitudeAndLongitude,
        // creatMapsInformation,
        getTaipeiSpeedCameraPositionsApi,
        getFakeTaipeiSpeedCameraPositions,
    }
}

export default useTaipeiSpeedCameraPositions
