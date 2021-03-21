import { ResponsiveCSS } from 'common/src/assets/css/responsive';
import { ResetCSS } from 'common/src/assets/css/style';
import bad from 'common/src/assets/image/brik/bad.png';
import good from 'common/src/assets/image/brik/good.png';
import { DrawerProvider } from 'common/src/contexts/DrawerContext';
import { theme } from 'common/src/theme/Brik';
import { ContentWrapper, GlobalStyle } from 'containers/Brik/brik.style';
import Footer from 'containers/Brik/Footer';
import Navbar from 'containers/Brik/Navbar';
import Head from 'next/head';
import React, { Fragment } from 'react';
import TagManager from 'react-gtm-module';
import { useSelector } from 'react-redux';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import config from '../../config';

if (process.browser && process.env.NODE_ENV !== 'development') {
  TagManager.initialize(config.tagManager);
}

const handleClickFormula = (type) => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'gaEvent',
      eventCategory: 'Formule',
      eventAction: 'Clic choix formule',
      eventValue: type
    }
  });
};

export default () => {
  if (process.browser) {
    const { auth } = useSelector((auth) => auth);
    if (auth.fetchResponse) {
      TagManager.dataLayer({
        dataLayer: {
          environment: process.env.NODE_ENV,
          customer: {
            is_loggued: auth.fetchResponse.status === 200,
            id: auth.fetchResponse.data.uid,
            is_customer: auth.fetchResponse.data.stripeCustomerId ? true : false,
            plan: '' //TODO
          }
        }
      });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <title>Brik | Tarifs</title>
          <meta name="theme-color" content="#185490" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

          <meta name="Description" content="Tarifs d'abonnements Brik" />

          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ResetCSS />
        <ResponsiveCSS />
        <GlobalStyle />
        <ContentWrapper>
          <Sticky top={0} innerZ={9999} className="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>

          {/* Tarifs : */}
          <div className="pricing-content">
            <div className="pricing-title">
              <h1>
                <strong>Choisisser</strong> une option
              </h1>
              <p>
                <strong>Tarifs d'abonnements Brik</strong>
              </p>
            </div>
            <div className="pricing-plan-container">
              <div className="pricing-plan-header">
                <h2>Propriétaire basique</h2>
                <span>(Gratuit)</span>
                <p className="op0">-</p>

                <span className="btn-blue" onClick={() => handleClickFormula('basic')}>
                  <strong>Formule actuelle {/* a rendre dynamique une fois la formule utilisé  */}</strong>
                </span>
              </div>

              <div className="pricing-plan-part">
                <h3>Valeurs</h3>

                <h4>Analyse de zone</h4>
                <p>45 requêtes / mois</p>

                <h4>Alerte transaction et plus value</h4>
                <img src={good} />
              </div>

              <div className="pricing-plan-part">
                <h3>Gestion</h3>

                <h4>Nombre de bien</h4>
                <p>1</p>

                <h4>Propriétaire</h4>
                <p>Personne physique</p>

                <h4>Multi propriétaire</h4>
                <img src={bad} />
              </div>

              <div className="pricing-plan-part">
                <h3>Transaction</h3>

                <h4>Proposition d'offre d'achat</h4>
                <p>1 par mois</p>

                <h4>Vendre un bien</h4>
                <img src={good} />
                <p className="op0">-</p>
              </div>
            </div>
            <div className="pricing-plan-container">
              <div className="pricing-plan-header lightblue">
                <div className="pricing-plan-recommended">Recommandé</div>
                <h2>Propriétaire premium</h2>
                <span>4,90€ / mois</span>
                <p>ou 49€ pour 12 mois</p>

                <span className="btn-blue" onClick={() => handleClickFormula('premium')}>
                  <strong>Choisir cette formule</strong>
                </span>
              </div>

              <div className="pricing-plan-part">
                <h3>Valeurs</h3>

                <h4>Analyse de zone</h4>
                <p>Illimité</p>

                <h4>Alerte transaction et plus value</h4>
                <img src={good} />
              </div>

              <div className="pricing-plan-part">
                <h3>Gestion</h3>

                <h4>Nombre de bien</h4>
                <p>1 inclus puis 0,99€ / bien</p>

                <h4>Propriétaire</h4>
                <p>Tous types</p>

                <h4>Multi propriétaire</h4>
                <img src={good} />
              </div>

              <div className="pricing-plan-part">
                <h3>Transaction</h3>

                <h4>Proposition d'offre d'achat</h4>
                <p>5 par mois</p>

                <h4>Vendre un bien</h4>
                <img src={good} />
                <p className="op0">-</p>
              </div>
            </div>

            <div className="pricing-plan-container">
              <div className="pricing-plan-header darkblue">
                <h2>Gestionnaire</h2>
                <span>19,90€ / mois</span>
                <p>ou 199€ pour 12 mois</p>

                <span className="btn-blue" onClick={() => handleClickFormula('gestionnaire')}>
                  <strong>Choisir cette formule</strong>
                </span>
              </div>

              <div className="pricing-plan-part">
                <h3>Valeurs</h3>

                <h4>Analyse de zone</h4>
                <p>Illimité</p>

                <h4>Alerte transaction et plus value</h4>
                <img src={good} />
              </div>

              <div className="pricing-plan-part">
                <h3>Gestion</h3>

                <h4>Nombre de bien</h4>
                <p>0,99€ / lot</p>

                <h4>Propriétaire</h4>
                <p>Tous type</p>

                <h4>Multi propriétaire</h4>
                <img src={good} />
              </div>

              <div className="pricing-plan-part">
                <h3>Transaction</h3>

                <h4>Proposition d'offre d'achat</h4>
                <p>-</p>

                <h4>Vendre un bien</h4>
                <img src={good} />
                <p>(+99€ si connexion sur gestionnaire)</p>
              </div>
            </div>
          </div>

          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
