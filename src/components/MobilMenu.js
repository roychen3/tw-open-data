import React, { useMemo, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from "react-router-dom";

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
import { MENU_LIST } from '../constants/menuItem'

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
            color: WEB_COLOR_WHITE,
            backgroundColor: WEB_COLOR_DARK_HOVER,
        }
    }
})

const ListItemLink = ({ icon, primary, to, closeMenu }) => {
    const classes = useStyles()

    const forwardRefLink = (itemProps, ref) => (<RouterLink to={to} ref={ref} {...itemProps} />)

    const renderLink = useMemo(() => (
        forwardRef(forwardRefLink)),
        [to],
    );

    return (
        <li>
            <ListItem button className={classes.listitem} component={renderLink} onClick={closeMenu}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    closeMenu: PropTypes.func.isRequired,
};

const MobilMenu = ({ closeMenu }) => {
    const classes = useStyles()

    const linkList = MENU_LIST.map((item) => {
        let icon = null;

        switch (item.icon) {
            case 'EventAvailableIcon':
                icon = <EventAvailableIcon style={{ color: WEB_COLOR_WHITE }} />
                break;
            case 'CloudIcon':
                icon = <CloudIcon style={{ color: WEB_COLOR_WHITE }} />
                break;
        
            default:
                break;
        }

        return <ListItemLink
            key={item.hasName}
            to={`/${item.hasName}`}
            primary={item.itemName}
            icon={icon}
            closeMenu={closeMenu}
        />
    }
    )

    return (
        <div className={classes.root}>
            <div className={classes.close}>
                <IconButton className={classes.iconButton} onClick={closeMenu}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <List className={classes.root}>
                <Divider />
                {linkList}
            </List>
        </div>
    )
}

MobilMenu.propTypes = {
    closeMenu: PropTypes.func.isRequired,
}

export default MobilMenu
