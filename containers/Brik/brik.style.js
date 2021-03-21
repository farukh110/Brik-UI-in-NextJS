import styled, { createGlobalStyle } from 'styled-components';
import { themeGet } from 'styled-system';
import bg from 'common/src/assets/image/brik/login/bg.png';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'upgrade', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'upgrade', sans-serif;
    margin-top: 0;
  }
  p{
    font-family: 'upgrade', sans-serif;
  }

  section {
    position: relative;
  }
  
`;

export const ContentWrapper = styled.div`
  overflow: hidden;
  .menuLeft {
    margin-left: 105px;
  }
  .menuRight {
    margin-left: auto;
  }

  .sticky-nav-active {
    .agencyModern-navbar {
      background-color: #185490;
      box-shadow: 0px 3px 8px 0px rgba(43, 83, 135, 0.08);
    }
  }
`;

export const LoginWrapper = styled.div`
  background-image: linear-gradient(to bottom, #212a3c96, #212a3c), url(${bg});
  background-size: 100%;
  background-repeat: round;
  min-height: 100vh;
  .menuLeft {
    margin-left: 105px;
  }
  .menuRight {
    margin-left: auto;
  }

  .sticky-nav-active {
    .agencyModern-navbar {
      background-color: #185490;
      box-shadow: 0px 3px 8px 0px rgba(43, 83, 135, 0.08);
    }
  }
`;

export const RegisterWrapper = styled.div`
  background: #f5f5f5;
  min-height: 100vh;
  display: flex;
  .menuLeft {
    margin-left: 105px;
  }
  .menuRight {
    margin-left: auto;
  }

  @media only screen and (max-width: 1024px) {
    .login-header ul {
      display: block !important;
      position: absolute;
      top: 5px;
      right: 10px;
    }

    display: block;
  }

  .sticky-nav-active {
    .agencyModern-navbar {
      background-color: #185490;
      box-shadow: 0px 3px 8px 0px rgba(43, 83, 135, 0.08);
    }
  }
`;
