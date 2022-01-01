import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import {
    getTaipeiSpeedCameraPositions,
    getTaipeiSpeedCameraPositionsSuccess,
    getTaipeiSpeedCameraPositionsFailure,
} from '../../redux/actions'
// import taipeiSpeedCameraPositionsFakeData from './fakeData.json'

// import { GOOGLE_MAPS_API_KEY } from '../../constants/googleMapsApiKey'
// 用太多要繳費給 Google，先註解掉
// const googleMapsClient = require('@google/maps').createClient({
//     key: GOOGLE_MAPS_API_KEY,
//     Promise: Promise
// })

const useTaipeiSpeedCameraPositions = () => {
    const dispatch = useDispatch()

    const taipeiSpeedCameraPositions = useSelector((state) => state.taipeiSpeedCameraPositions.taipeiSpeedCameraPositions)
    const taipeiSpeedCameraPositionsError = useSelector((state) => state.taipeiSpeedCameraPositions.taipeiSpeedCameraPositionsError)
    const taipeiSpeedCameraPositionsLoading = useSelector((state) => state.taipeiSpeedCameraPositions.taipeiSpeedCameraPositionsLoading)

    // 用太多要繳費給 Google，先註解掉
    // const getLatitudeAndLongitude = (address) => (
    //     googleMapsClient.geocode({ address })
    //         .asPromise()
    //         .then((response) => {
    //             console.log(response.json.results[0])
    //             // return 'asd'
    //             return ({
    //                 address,
    //                 formatted_address: response.json.results[0].formatted_address,
    //                 location: response.json.results[0].geometry.location,
    //             })
    //         })
    //         .catch((err) => {
    //             return err.message
    //         })
    // )

    // 用太多要繳費給 Google，先註解掉
    // const creatMapsInformation = async (taipeiSpeedCameraPositionsData) => (
    //     await Promise.all(taipeiSpeedCameraPositionsData.map(async (item) => {
    //         const { setRoad,
    //             setPosition,
    //         } = item
    //         const latitudeAndLongitude = await getLatitudeAndLongitude(`臺北市${setRoad}${setPosition}`)
    //         return {
    //             ...item,
    //             ...latitudeAndLongitude,
    //         }
    //     }))
    // )

    const getTaipeiSpeedCameraPositionsApi = () => {
        dispatch(getTaipeiSpeedCameraPositions())

        axios.get('https://data.taipei/api/getDatasetInfo/downloadResource?id=745b8808-061f-4f5b-9a62-da1590c049a9&rid=5012e8ba-5ace-4821-8482-ee07c147fd0a')
            .then((resultData) => {
                // 因為 api 不支援跨網域
                // 且來源只提供 csv 檔，還要轉乘 json
                // 永遠跑不到這裡
                console.log(resultData)

                // 用太多要繳費給 Google，先註解掉
                // const latitudeAndLongitudeList = await creatMapsInformation(taipeiSpeedCameraPositionsFakeData)
                // dispatch(getTaipeiSpeedCameraPositionsSuccess(latitudeAndLongitudeList))
            })
            .catch((err) => {
                dispatch(getTaipeiSpeedCameraPositionsFailure(err))
            })
    }

    const getFakeTaipeiSpeedCameraPositions = async () => {
        // 用太多要繳費給 Google，先註解掉
        // const latitudeAndLongitudeList = await creatMapsInformation(taipeiSpeedCameraPositionsFakeData)

        // creatMapsInformation 產生的資料
        const latitudeAndLongitudeList = [
            {
                "no": 1,
                "features": "測速",
                "setRoad": "環河北路3段",
                "setPosition": "葫蘆街",
                "jurisdiction": "士林",
                "shootingDirection": "南向北",
                "speedLimit": 50,
                "address": "臺北市環河北路3段葫蘆街",
                "formatted_address": "111台灣台北市士林區葫蘆街 & 環河北路三段",
                "location": {
                    "lat": 25.0824497,
                    "lng": 121.5074374
                }
            },
            {
                "no": 12,
                "features": "測速",
                "setRoad": "承德路3段",
                "setPosition": "敦煌路",
                "jurisdiction": "大同",
                "shootingDirection": "南北雙向",
                "speedLimit": 50,
                "address": "臺北市承德路3段敦煌路",
                "formatted_address": "103台灣台北市大同區承德路三段 & 敦煌路",
                "location": {
                    "lat": 25.0751821,
                    "lng": 121.5200386
                }
            },
            {
                "no": 48,
                "features": "測速",
                "setRoad": "市民大道(高架道)",
                "setPosition": "京站百貨前",
                "jurisdiction": "中正一",
                "shootingDirection": "西往東",
                "speedLimit": 80,
                "address": "臺北市市民大道(高架道)京站百貨前",
                "formatted_address": "103台灣台北市大同區承德路一段1號",
                "location": {
                    "lat": 25.049308,
                    "lng": 121.5171935
                }
            }
        ]


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
