import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TextField from '@material-ui/core/TextField'


const StyledTextField = styled(TextField)`
.MuiFormLabel-root,
.MuiOutlinedInput-input {
    color: ${({ theme }) => theme.mainText};
}

.MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.mainText};
}

.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline,
.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline
{
    border-color: ${({ theme }) => theme.highlight};
}

.MuiFormLabel-root.Mui-focused {
    color: ${({ theme }) => theme.highlight};
}
`

const MuiTextField = ({
    id,
    label,
    value,
    onChange,
    fullWidth,
    variant,
}) => {
    return (
        <StyledTextField
            id={id}
            label={label}
            value={value}
            onChange={onChange}
            fullWidth={fullWidth}
            variant={variant}
        />
    )
}

MuiTextField.defaultProps = {
    id: undefined,
    label: undefined,
    value: undefined,
    onChange: null,
    fullWidth: false,
    variant: 'outlined',
}
MuiTextField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    fullWidth: PropTypes.bool,
    variant: PropTypes.string,
}

export default MuiTextField
