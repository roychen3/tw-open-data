import React from 'react';
import styled from 'styled-components';
import ErrorIcon from '@material-ui/icons/Error';

const StyledIcon = styled.div`
color: ${({ theme }) => theme.highlight};
`;

const MessageModal = () => {
  return (
    <div>
      <StyledIcon>
        <ErrorIcon fontSize="large" />
      </StyledIcon>
      <p>API 網址發生錯誤，呈現資料為開發用假資料。</p>
      <br />
      <p>資料來源: <a href="https://data.gov.tw/dataset/6069">政府資料開放平臺</a></p>
    </div>
  );
};

MessageModal.propTypes = {

};

export default MessageModal;
