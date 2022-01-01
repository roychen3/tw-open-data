import { lazy, useMemo } from 'react'
import { Route } from "react-router-dom"
import { useStore } from 'react-redux'

import { menuList } from '../constants/menuList'

export const creatRouteList = () => {
    const store = useStore()

    const Holiday = lazy(() => import('../redux/holiday/reducers')
        .then((reducer) => {
            store.injectReducer('holiday', reducer.default)
            return import('../pages/holiday')
        })
    )
    const Weather = lazy(() => import('../redux/weather/reducers')
        .then((reducer) => {
            store.injectReducer('weather', reducer.default)
            return import('../pages/weather')
        })
    )
    const GoogleMaps = lazy(() => import('../redux/taipeiSpeedCameraPositions/reducers')
        .then((reducer) => {
            store.injectReducer('taipeiSpeedCameraPositions', reducer.default)
            return import('../pages/googleMaps')
        })
    )

    const getPageComponents = (name) => {
        switch (name) {
            case 'holiday':
                return <Holiday />
            case 'weather':
                return <Weather />
            case 'googleMaps':
                return <GoogleMaps />

            default:
                return <></>
        }
    }

    const routeList = menuList.map((item) => (
        <Route exact key={`${item.hashName}`} path={`/${item.hashName}`}>{getPageComponents(item.hashName)}</Route>))

    return useMemo(() => routeList, [])
}