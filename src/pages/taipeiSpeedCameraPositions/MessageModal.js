import React from 'react'
import styled from 'styled-components'
import WarningRoundedIcon from '@material-ui/icons/WarningRounded'

const StyledMessageContent = styled.div`
text-align: left;
`
const StyledIcon = styled.div`
color: ${({ theme }) => theme.highlight};
`

const StyledNote = styled.p`
color: ${({ theme }) => theme.highlight};
`

const MessageModal = () => {
  return (
    <>
      <StyledIcon>
        <WarningRoundedIcon fontSize="large" />
      </StyledIcon>
      <StyledMessageContent>
        <StyledNote>
          api僅提供中文地址，經緯度是透過 google api geocode 轉換的，因此
        </StyledNote>
        <StyledNote>
          1. 會有一些地址在轉換時 api 會找不到經緯度，地圖上不會顯示地標
        </StyledNote>
        <StyledNote>
          2. 地圖上的地標只會是大略的位置，還請參照文字給的地址來確認
        </StyledNote>
        <br />
        <p>因為 api 不支援跨網域，且來源只提供 csv 檔，呈現資料為手動更新，故有可能不會有最新資料。</p>
        <br />
        <p>資料最後更新日期:	2021-11-17 09:25:55</p>
        <p>資料來源: </p>
        <p>
          <a href="https://data.taipei/#/dataset/detail?id=745b8808-061f-4f5b-9a62-da1590c049a9">
            https://data.taipei/#/dataset/detail?id=745b8808-061f-4f5b-9a62-da1590c049a9
          </a>
        </p>
      </StyledMessageContent>
    </>
  )
}

MessageModal.propTypes = {

}

export default MessageModal
