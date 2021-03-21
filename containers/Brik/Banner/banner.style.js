import styled from 'styled-components';
import { rgba } from 'polished';
import { themeGet } from 'styled-system';
import illustration from 'common/src/assets/image/brik/bannerbg.png';

const Section = styled.section`
  height: 100vh;
  top: -60px;
  background-image: linear-gradient(to bottom, #212a3c96, #212a3c), url(${illustration});
  background-size: 100%;
  background-repeat: round;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  /* Portrait */

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    background-size: 53%;
  }
  @media only screen and (max-width: 1280px) and (max-height: 610px) {
    background-size: 60%;
    min-height: 85vh;
  }
  @media only screen and (max-width: 1024px) {
    background-image: none;
    min-height: 80vh;
  }
  @media only screen and (max-width: 480px) {
    min-height: 70vh;
  }
`;

export const Illustration = styled.div``;

export const BannerContent = styled.div`
  max-width: 60%;
  width: 100%;
  text-align: center;
  margin: 0 auto;

  h1 {
    font-family: upgrade;
    font-size: 40px;
    line-height: 40px;
    font-weight: 300;
    letter-spacing: -0.5px !important;
    color: ${themeGet('colors.menu', '#fff')};
    margin-bottom: 24px;
    letter-spacing: -1px;
    margin-top: 0;
    @media only screen and (max-width: 1440px) {
      font-size: 36px;
      margin-bottom: 20px;
      line-height: 55px;
    }
    span {
      font-weight: 700;
    }
    @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
      line-height: 45px;
    }
    @media only screen and (min-width: 1024px) and (max-width: 1440px) {
      margin-bottom: 32px;
    }
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
      font-size: 28px;
      line-height: 44px;
    }
    @media only screen and (max-width: 1024px) {
      font-size: 28px;
      margin-bottom: 20px;
    }
    @media only screen and (width: 1280px) {
      font-size: 32px;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    @media only screen and (max-width: 768px) {
      font-size: 38px;
    }
    @media only screen and (max-width: 480px) {
      font-size: 23px;
      margin-bottom: 20px;
      line-height: 40px;
    }
  }
  .banner-caption {
    color: ${themeGet('colors.paragraph', '#fff')};
    font-size: 18px;
    line-height: 33px;
    font-weight: 400;
    margin-bottom: 0;
    margin: 0;
    @media only screen and (max-width: 1024px) {
      line-height: 33px;
    }
    @media only screen and (max-width: 768px) {
      margin-bottom: 40px;
    }
    @media only screen and (max-width: 480px) {
      font-size: 16px;
    }
  }
`;

export const LandingSearch = styled.div`
  top: 380px;
  left: 312px;
  width: 816px;
  height: 232px;
  background: #185490 0% 0% no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
  margin-top: 60px;
`;

export const Subscribe = styled.div`
  display: flex;
  margin-top: 10px;
  
  @media only screen and (max-width: 480px) {
    align-items: center;
  }
  .reusecore__input {
    width: 100%;
  }
  .field-wrapper {
    margin-right: 15px;
    input {
      font-family: upgrade;
      background: #FFFFFF 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #00000029;
      border-radius: 5px;
      opacity: 1;
      height: 60px;
      width: 90%;
      margin: 0 auto;
      }
      &:focus {
        border-color: #185490;
      }

      @media only screen and (max-width: 1280px) {
        min-height: 50px;
      }
    }
  }
  button {
    background-color: #185490;
    min-width: 150px;

    @media only screen and (max-width: 480px) {
      min-width: 100px;
    }
  }
`;

export const SponsoredBy = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px;
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
    display: block;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    display: block;
    margin-top: 25px;
  }

  @media only screen and (max-width: 480px) {
    align-items: flex-start;
    flex-direction: column;
  }

  .sponsoredBy {
    color: ${rgba('#566272', 1)};
    font-size: 16px;
    margin-right: 21px;
    margin-bottom: 0;
    @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
      margin: 0 0 20px 0;
    }
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
      margin: 0 0 15px 0;
    }
    @media only screen and (max-width: 480px) {
      margin-bottom: 15px;
    }
  }
`;

export const Image = styled.div`
  position: relative;
  top: -20px;
  margin: 0 auto;
`;

export const ImageGroup = styled.div`
  display: flex;
  align-items: center;
  img {
    &:not(:last-child) {
      margin-right: 23px;
    }

    @media only screen and (max-width: 480px) {
      max-width: 27%;
    }
  }
`;

export default Section;
