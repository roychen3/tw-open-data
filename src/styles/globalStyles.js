import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
  font-family: NotoSansTCRegular, QuicksandRegular, sans-serif !important;
  margin: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html,
body,
#root,
.app {
  height: 100%;
  margin: 0;
}

body {
  color: ${({ theme }) => theme.mainText};
  background-color: ${({ theme }) => theme.mainBackground};
}

a {
  text-decoration: none;
  color: ${({ theme }) => theme.mainText};

  &:hover {
    color: ${({ theme }) => theme.highlight};
    cursor: pointer;
  }
}
`;
