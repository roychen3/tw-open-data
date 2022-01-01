import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import CloudIcon from '@material-ui/icons/Cloud'
import LocationOnIcon from '@material-ui/icons/LocationOn'

export const menuList = [
    {
        hashName: 'holiday',
        itemName: '國定假日',
        icon: <EventAvailableIcon />,
    },
    {
        hashName: 'weather',
        itemName: '天氣預報',
        icon: <CloudIcon />,
    },
    {
        hashName: 'googleMaps',
        itemName: 'Google Maps',
        icon: <LocationOnIcon />,
    },
]
