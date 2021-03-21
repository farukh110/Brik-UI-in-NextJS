import styled from 'styled-components';
import { rgba } from 'polished';

export const Section = styled.footer`
  position: relative;
  background-color: #1a202c;
  height: 165px;
`;

export const FooterTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  .react-reveal {
    width: calc(20% - 12px);
    @media screen and (max-width: 768px) {
      width: calc(35% - 12px);
    }
    @media screen and (max-width: 480px) {
      width: 50%;
    }
    @media screen and (max-width: 360px) {
      width: 100%;
    }
  }
`;

export const FooterWidget = styled.div`
  margin-right: 15px;
  margin-bottom: 60px;

  &:last-child {
    margin-right: 0;
  }
  .widgetListItem {
    a {
      color: ${rgba('#FFF', 0.8)};
      font-size: 14px;
      line-height: 2;
      &:hover {
        color: #fff;
      }
    }
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Copyright = styled.p`
  color: ${rgba('#777F90', 0.6)};
  font-size: 14px;
  line-height: 18px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
  img {
    margin-right: 15px;
    max-width: 130px;
    opacity: 0.4;
    @media screen and (max-width: 480px) {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
`;

export const FooterNav = styled.ul`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-top: 25px;
  }
  @media screen and (max-width: 360px) {
    flex-wrap: wrap;
  }
  li {
    margin-right: 15px;
    @media screen and (max-width: 360px) {
      margin-top: 10px;
    }
    &:last-child {
      margin-right: 0;
    }
    a {
      font-size: 15px;
      line-height: 33px;
      color: #fff;
    }
  }
`;
