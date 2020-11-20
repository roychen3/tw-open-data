import React, { useMemo, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from "react-router-dom"
import styled from 'styled-components'

import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'

import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { menuList } from '../routes'

const StyledListItem = styled(ListItem)`
color: ${({ theme }) => theme.mainText};

.MuiListItemIcon-root .MuiSvgIcon-root {
    color: ${({ theme }) => theme.mainText};
}

:hover {
    color: ${({ theme }) => theme.highlight};
    background-color: ${({ theme }) => theme.hover};

    .MuiListItemIcon-root .MuiSvgIcon-root {
        color: ${({ theme }) => theme.highlight};
    }
}
`

const ListItemLink = ({ icon, primary, to, closeMenu }) => {
    const forwardRefLink = (itemProps, ref) => (<RouterLink to={to} ref={ref} {...itemProps} />)

    const renderLink = useMemo(() => (
        forwardRef(forwardRefLink)),
        [to],
    )

    return (
        <li>
            <StyledListItem button component={renderLink} onClick={closeMenu}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </StyledListItem>
        </li>
    )
}

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    closeMenu: PropTypes.func.isRequired,
}

const StyledMobileMenuContainer = styled.div`
width: 250px;
`
const StyledMobileMenuClose = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
padding: 1rem;
`
const StyledIconButton = styled(IconButton)`
color: ${({ theme }) => theme.mainText};

:hover {
    background-color: ${({ theme }) => theme.hover};
}
`
const StyledDivider = styled(Divider)`
background-color: ${({ theme }) => theme.mainBackground};
`
const StyledDarkListItemText = styled(ListItemText)`
text-align: right;
color: ${({ theme }) => theme.mainText};
`
const StyledLightListItemText = styled(ListItemText)`
color: ${({ theme }) => theme.mainText};
`
const StyledSwitch = styled(Switch)`
.MuiSwitch-track{
    background-color: ${({ theme }) => theme.secondText};
}
`

const MobileMenu = ({ closeMenu, toggleTheme }) => {
    const linkList = menuList.map((item) => (
        <ListItemLink
            key={item.hashName}
            to={`/${item.hashName}`}
            primary={item.itemName}
            icon={item.icon}
            closeMenu={closeMenu}
        />))

    return (
        <StyledMobileMenuContainer>
            <StyledMobileMenuClose>
                <StyledIconButton size="small" onClick={closeMenu}>
                    <ChevronLeftIcon />
                </StyledIconButton>
            </StyledMobileMenuClose>
            <StyledDivider />
            <List>
                <ListItem>
                    <StyledDarkListItemText primary="Dark" />
                    <StyledSwitch
                        color="default"
                        onChange={toggleTheme}
                    />
                    <StyledLightListItemText primary="Light" />
                </ListItem>
            </List>
            <StyledDivider />
            <List>
                {linkList}
            </List>
        </StyledMobileMenuContainer>
    )
}

MobileMenu.propTypes = {
    closeMenu: PropTypes.func.isRequired,
    toggleTheme: PropTypes.func.isRequired,
}

export default MobileMenu
