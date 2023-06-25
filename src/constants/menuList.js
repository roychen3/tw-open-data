import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import CloudIcon from '@material-ui/icons/Cloud';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

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
        hashName: 'taipeiSpeedCameraPositions',
        itemName: '臺北市固定測速照相地點',
        icon: <CameraAltIcon />,
    },
];
