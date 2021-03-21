import { ResponsiveCSS } from 'common/src/assets/css/responsive';
import { ResetCSS } from 'common/src/assets/css/style';
import { DrawerProvider } from 'common/src/contexts/DrawerContext';
import { theme } from 'common/src/theme/Brik';
import Banner from 'containers/Brik/Banner';
import { ContentWrapper, GlobalStyle } from 'containers/Brik/brik.style';
import Footer from 'containers/Brik/Footer';
import LetsStart from 'containers/Brik/LetsStart';
import Navbar from 'containers/Brik/Navbar';
import PlacesSuggestions from 'containers/Brik/PlacesSuggestions';
import Service from 'containers/Brik/Service';
import ToolsDesc from 'containers/Brik/ToolsDesc';
import Head from 'next/head';
import React, { Fragment } from 'react';
import CookieConsent from 'react-cookie-consent';
import TagManager from 'react-gtm-module';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import config from '../config';

if (process.browser) {
  TagManager.initialize(config.tagManager);
}

const landing = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <title>Brik | L’immobilier d’investissement de A à Z</title>
          <meta name="theme-color" content="#185490" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

          <meta name="Description" content="L’immobilier d’investissement de A à Z" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100&display=swap"
            rel="stylesheet"
          />
          <script
            type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBnf0WJj1Xu2Bq9hUnxCvS3GmiHpSiHY4o&libraries=places"
          ></script>

          <style>
            {`@media only screen and (max-width: 1024px) {
              header button.menubar {
                right: -15px !important;
              }
              .main-logo {
                top: 12px !important;
              }
            }`}
          </style>
        </Head>
        <ResetCSS />
        <ResponsiveCSS />
        <GlobalStyle />
        <ContentWrapper>
          <CookieConsent
            location="bottom"
            buttonText="J'accepte"
            cookieName="cookieName"
            style={{ background: '#2B373B' }}
            buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
            expires={150}
          >
            Ce site utilise les cookies pour améliorer votre experience.{' '}
            <span style={{ fontSize: '10px' }}>
              En continuant votre navigation sur ce site, vous acceptez l'utilisation des cookies sur{' '}
              {process.env.DOMAIN} et ses sous-domaines{' '}
              <a
                className="text-light"
                target="_blank"
                href="https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000038783337&categorieLien=id"
              >
                En savoir plus
              </a>
            </span>
          </CookieConsent>
          <Sticky top={0} innerZ={9999} activeclassName="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <Banner />
          <ToolsDesc />
          <Service />
          <LetsStart />
          <PlacesSuggestions light={true} />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export default landing;
