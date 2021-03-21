import styled from 'styled-components';
import { themeGet } from 'styled-system';

const Section = styled.div`
  background-color: #f5f5f5;
  padding: 100px 0 120px;

  @media screen and (max-width: 480px) {
    padding: 60px 0;
  }
`;

export default Section;
