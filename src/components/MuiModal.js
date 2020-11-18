import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

import { WEB_COLOR_BLACK, WEB_COLOR_ORANGEWEB, WEB_COLOR_WHITE } from '../constants/color'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    textAlign: 'center',
    color: WEB_COLOR_WHITE,
    backgroundColor: WEB_COLOR_BLACK,
    border: `2px solid ${WEB_COLOR_ORANGEWEB}`,
    padding: '2rem 1rem',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  icon: {
    color: WEB_COLOR_ORANGEWEB,
  },
}))

const MuiModal = ({
  open,
  handaleClose,
  children,
}) => {
  const classes = useStyles()

  return (
    <Modal
      open={open}
      onClose={handaleClose}
    >
      <div className={classes.paper}>
        {children}
      </div>
    </Modal>
  )
}

MuiModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handaleClose: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
}

export default MuiModal
