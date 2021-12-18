import React from 'react'
import styled from 'styled-components'
import WarningRoundedIcon from '@material-ui/icons/WarningRounded'

const StyledIcon = styled.div`
color: ${({ theme }) => theme.highlight};
`

const MessageModal = () => {
  return (
    <div>
      <StyledIcon>
        <WarningRoundedIcon fontSize="large" />
      </StyledIcon>
      <p>原 API 網址有誤，呈現資料為手動更新，故有可能不會有最新資料。</p>
      <p>資料來源: </p>
      <p><a href="https://data.gov.tw/dataset/145708">https://data.gov.tw/dataset/145708</a></p>
      <p><a href="https://data.gov.tw/dataset/14718">https://data.gov.tw/dataset/14718</a></p>
    </div>
  )
}

MessageModal.propTypes = {

}

export default MessageModal
