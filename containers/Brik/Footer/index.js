import React from 'react';
import Fade from 'react-reveal/Fade';

import Container from 'common/src/components/UI/Container';
import Image from 'common/src/components/Image';
import Link from 'common/src/components/Link';
import { Section, FooterTop, FooterWidget, FooterBottom, Copyright, FooterNav } from './footer.style';
import { data } from 'common/src/data/Brik';
import Logo from 'common/src/assets/image/brik/logo.png';

const Footer = () => {
  return (
    <Section>
      <Container>
        <FooterBottom>
          <Copyright>
            <Image src={Logo} alt="Brik" />
            Copyright &copy; {new Date().getFullYear()} Brik. -{' '}
            <Link className="text-cgu-link" href="/mentions">
              {' '}
              Mentions légales{' '}
            </Link>{' '}
            - Utilisation des données personnelles
          </Copyright>
        </FooterBottom>
      </Container>
    </Section>
  );
};

export default Footer;
