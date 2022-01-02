import { lazy, useMemo } from 'react'
import { Route } from "react-router-dom"
import { useStore } from 'react-redux'
import styled from 'styled-components'

import { menuList } from '../constants/menuList'

const StyledPageContainer = styled.div`
width: 99%;
margin: 0 auto;
padding: 4rem 0 8rem;

@media (min-width: 960px) {
    width: ${({ $needFullWidth }) => $needFullWidth ? '99%' : '70%'};
}

.page-title {
    font-size: xx-large;
    font-weight: bolder;
    margin-bottom: 2rem;
}

.table-container {
    margin: 1rem 0;
}
`

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
    const TaipeiSpeedCameraPositions = lazy(() => import('../redux/taipeiSpeedCameraPositions/reducers')
        .then((reducer) => {
            store.injectReducer('taipeiSpeedCameraPositions', reducer.default)
            return import('../pages/taipeiSpeedCameraPositions')
        })
    )

    const getPageComponents = (name) => {
        switch (name) {
            case 'holiday':
                return <Holiday />
            case 'weather':
                return <Weather />
            case 'taipeiSpeedCameraPositions':
                return <TaipeiSpeedCameraPositions />

            default:
                return <></>
        }
    }

    const routeList = menuList.map((item) => (
        <Route exact key={`${item.hashName}`} path={`/${item.hashName}`}>
            {['taipeiSpeedCameraPositions'].includes(item.hashName)
                ?
                <StyledPageContainer $needFullWidth>
                    {getPageComponents(item.hashName)}
                </StyledPageContainer>
                :
                <StyledPageContainer>
                    {getPageComponents(item.hashName)}
                </StyledPageContainer>
            }
        </Route>
    ))

    return useMemo(() => routeList, [])
}