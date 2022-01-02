import React from 'react'
import styled from 'styled-components'
import ErrorIcon from '@material-ui/icons/Error'

const StyledIcon = styled.div`
color: ${({ theme }) => theme.highlight};
`
const StyledMessageContent = styled.div`
text-align: left;
`

const MessageModal = () => {
  return (
    <>
      <StyledIcon>
        <ErrorIcon fontSize="large" />
      </StyledIcon>
      <StyledMessageContent>
        <p>因為 api 不支援跨網域，且來源只提供 csv 檔，呈現資料為手動更新，故有可能不會有最新資料。</p>
        <br />
        <p>資料最後更新日期: 2021-12-18</p>
        <p>資料來源: </p>
        <p><a href="https://data.gov.tw/dataset/145708">政府資料開放平臺</a></p>
        <p><a href="https://data.ntpc.gov.tw/datasets/308DCD75-6434-45BC-A95F-584DA4FED251">新北市政府資料開放平臺</a></p>
      </StyledMessageContent>
    </>
  )
}

MessageModal.propTypes = {

}

export default MessageModal
