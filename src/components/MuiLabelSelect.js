import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const StyledFormControl = styled(FormControl)`
margin: 0.5rem !important;
min-width 70px !important;
`
const StyledMenuItem = styled(MenuItem)``

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
    <StyledMenuItem key={item.value} value={item.value}>
      {item.name}
    </StyledMenuItem>
  ))

  return (
    <StyledFormControl>
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
    </StyledFormControl>
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
