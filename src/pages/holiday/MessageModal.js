import React from 'react'
// import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import WarningRoundedIcon from '@material-ui/icons/WarningRounded'

import { WEB_COLOR_ORANGEWEB } from '../../constants/color'

const useStyles = makeStyles({
  icon: {
    color: WEB_COLOR_ORANGEWEB,
  },
})


const MessageModal = () => {
  const classes = useStyles()

  return (
    <div>
      <WarningRoundedIcon className={classes.icon} fontSize="large" />
      <p>原 API 網址有誤，呈現資料為手動更新，故有可能不會有最新資料。</p>
    </div>
  )
}

MessageModal.propTypes = {

}

export default MessageModal
