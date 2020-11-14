import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import CloudIcon from '@material-ui/icons/Cloud';

import { WEB_COLOR_WHITE } from '../constants/color'

import Holiday from '../pages/holiday'
import Weather from '../pages/weather'

export const menuList = [
    {
        hashName: 'holiday',
        itemName: '國定假日',
        icon: <EventAvailableIcon style={{ color: WEB_COLOR_WHITE }} />,
        page: <Holiday />
    },
    {
        hashName: 'weather',
        itemName: '全國天氣',
        icon: <CloudIcon style={{ color: WEB_COLOR_WHITE }} />,
        page: <Weather />
    },
] 