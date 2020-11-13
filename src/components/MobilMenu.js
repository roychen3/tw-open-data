import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import CloudIcon from '@material-ui/icons/Cloud';

import { WEB_COLOR_WHITE, WEB_COLOR_DARK_HOVER } from '../constants/color'

const useStyles = makeStyles({
    root: {
        width: '250px',
    },
    close: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0.5rem',
    },
    iconButton: {
        color: WEB_COLOR_WHITE,

        '&:hover': {
            backgroundColor: WEB_COLOR_DARK_HOVER,
        }
    },
    listitem: {
        '&:hover': {
            backgroundColor: WEB_COLOR_DARK_HOVER,
        }
    }
})

const MobilMenu = ({ closeMenu }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.close}>
                <IconButton className={classes.iconButton} onClick={closeMenu}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <List className={classes.root}>
                <Divider />
                <ListItem button className={classes.listitem} onClick={closeMenu}>
                    <ListItemIcon><EventAvailableIcon style={{ color: WEB_COLOR_WHITE }} /></ListItemIcon>
                    <ListItemText primary="國定假日" />
                </ListItem>
                <ListItem button className={classes.listitem} onClick={closeMenu}>
                    <ListItemIcon><CloudIcon style={{ color: WEB_COLOR_WHITE }} /></ListItemIcon>
                    <ListItemText primary="全國天氣" />
                </ListItem>
            </List>
        </div>
    )
}

MobilMenu.propTypes = {
    closeMenu: PropTypes.func.isRequired,
}

export default MobilMenu
