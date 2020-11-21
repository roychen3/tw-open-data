import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import CloudIcon from '@material-ui/icons/Cloud'

import Holiday from '../pages/holiday'
import Weather from '../pages/weather'

export const menuList = [
    {
        hashName: 'holiday',
        itemName: '國定假日',
        icon: <EventAvailableIcon />,
        page: <Holiday />
    },
    {
        hashName: 'weather',
        itemName: '天氣預報',
        icon: <CloudIcon />,
        page: <Weather />
    },
] 