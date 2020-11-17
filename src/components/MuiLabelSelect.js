import React from 'react'
import PropTypes from 'prop-types'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { WEB_COLOR_BLACK, WEB_COLOR_OXFORDBLUE, WEB_COLOR_ORANGEWEB, WEB_COLOR_PLATINUM, WEB_COLOR_WHITE, WEB_COLOR_DARK_HOVER } from '../constants/color'

const theme = createMuiTheme({
    overrides: {
        MuiFormControl: {
            root: {
                margin: '0.5rem',
                minWidth: 100,

                '&.MuiFormControl-root .MuiInput-underline:after': {
                    borderBottom: `${WEB_COLOR_ORANGEWEB} 1px solid`,
                },
                '&:hover': {
                    '&.MuiFormControl-root .MuiInputLabel-root': {
                        color: WEB_COLOR_ORANGEWEB,
                    },
                    '&.MuiFormControl-root .MuiInput-underline::before': {
                        borderBottom: `${WEB_COLOR_ORANGEWEB} 1px solid`,
                    }
                }
            },
        },
        MuiInputLabel: {
            root: {
                color: WEB_COLOR_PLATINUM,

                '&.MuiFormLabel-root.Mui-focused': {
                    color: WEB_COLOR_ORANGEWEB,
                },
            },
        },
        MuiSelect: {
            root: {
                color: WEB_COLOR_WHITE,
                borderBottom: `${WEB_COLOR_WHITE} 1px solid`,
            },
            icon: {
                color: WEB_COLOR_PLATINUM,
            },
        },
        MuiMenuItem: {
            root: {
                color: WEB_COLOR_PLATINUM,
                backgroundColor: WEB_COLOR_BLACK,

                '&.Mui-selected': {
                    color: WEB_COLOR_ORANGEWEB,
                    backgroundColor: WEB_COLOR_OXFORDBLUE,
                },
                '&:hover': {
                    backgroundColor: WEB_COLOR_DARK_HOVER,
                }
            },
        },
        MuiPaper: {
            root: {
                backgroundColor: WEB_COLOR_BLACK,
            }
        }
    },
})

const MuiLabelSelect = ({
    labelId,
    labelText,
    SelectId,
    value,
    setValue,
    selectionItems,
}) => {
    const [open, setOpen] = React.useState(false)

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const selectionMenuItemList = selectionItems.map((item) => (
        <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>))

    return (
        <ThemeProvider theme={theme}>
            <FormControl >
                <InputLabel id={labelId}>{labelText}</InputLabel>
                <Select
                    labelId="year-select-label"
                    id={SelectId}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={value}
                    onChange={handleChange}
                >
                    {selectionMenuItemList}
                </Select>
            </FormControl>
        </ThemeProvider>
    )
}

MuiLabelSelect.propTypes = {
    labelId: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    SelectId: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    selectionItems: PropTypes.instanceOf(Array).isRequired,
}

export default MuiLabelSelect
