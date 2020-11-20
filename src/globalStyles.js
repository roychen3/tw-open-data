import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
* {
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

a {
  text-decoration: none;
  color: ${({ theme }) => theme.mainText};

  &:hover {
    color: ${({ theme }) => theme.highlight};
    cursor: pointer;
  }
}

/* === Header === */
.header-container {
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.secondBackground};
  position: fixed;
  z-index: 110;

  .title-container {
    min-height: 30px;
    height: 100%;
    display: flex;
    align-items: center;

    .title {
      margin: auto 0;
      font-size: large;
      font-weight: bolder;
      color: ${({ theme }) => theme.mainText};
    }
  }

  .menu {
    min-height: 30px;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    a {
      margin-right: 1rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

/* === Content === */
.content {
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.mainText};
  min-height: 100%;
  padding-top: 56px;
  margin-bottom: -47px;

  .content-container {
    width: 95%;
    margin: 0 auto;
    padding: 4rem 0 8rem;

    @media (min-width: 992px) {
      width: 70%;
    }

    .page-title {
      font-size: xx-large;
      font-weight: bolder;
      margin-bottom: 2rem;
    }

    .table-container {
        margin: 1rem 0;
    }
  }
}

/* === Footer === */
footer {
  width: 100%;
  background-color: ${({ theme }) => theme.secondBackground};
  color: ${({ theme }) => theme.secondText};
  padding: 1rem;
  font-size: small;
  text-align: center;
}
`
