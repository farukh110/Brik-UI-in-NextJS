import { ResetCSS } from 'common/src/assets/css/style';
import { DrawerProvider } from 'common/src/contexts/DrawerContext';
import { theme } from 'common/src/theme/Brik';
import { ContentWrapper, GlobalStyle } from 'containers/Brik/brik.style';
import Footer from 'containers/Brik/Footer';
import Navbar from 'containers/Brik/Navbar';
import Head from 'next/head';
import React, { Fragment } from 'react';
import TagManager from 'react-gtm-module';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import config from '../../config';

if (process.browser && process.env.NODE_ENV !== 'development') {
  TagManager.initialize(config.tagManager);
}

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <title>Brik - Mentions légales</title>
          <meta name="theme-color" content="#185490" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

          <meta name="Description" content="Fonctionnalité bientôt disponible" />

          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <Sticky top={0} innerZ={9999} className="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>

          {/* Tarifs : */}
          <div className="pricing-content">
            <div class="cgu-header">
              <h1>Mentions légales</h1>
              <p>
                Merci de lire avec attention les différentes modalités d'utilisation du présent site avant d'y parcourir
                ses pages. En vous connectant sur ce site, vous acceptez sans réserves les présentes modalités. Aussi,
                conformément à l'article n°6 de la Loi n°2004-575 du 21 Juin 2004 pour la confiance dans l'économie
                numérique, les responsables du présent site internet {process.env.DOMAIN} sont :
              </p>
            </div>
            <p className="cgu-text">
              <br />
              <strong>Le site www.{process.env.DOMAIN} est édité par :</strong>
              <br />
              <br />
              SAS BRIK au capital de 50 000 €<br />
              Société dont l’objet est de fournir un outil complet d’information, de gestion et de transaction
              immobilière dédié au monde de l’investissement.
              <br />
              RCS Paris 881 050 736
              <br />
              Code APE 6312Z
              <br />
              N° TVA : FR93881050736
              <br />
              Siège social : 37 Rue des Mathurins - 75008 Paris – France
              <br />
              N° de téléphone : 03 62 02 80 80
              <br />
              Mail : hello@{process.env.DOMAIN}
              <br />
              <br />
              <br />
              <strong>Directeur de la publication :</strong>
              <br />
              <br />
              Monsieur Richard Winckels, Président
              <br />
              <br />
              <strong>Le site est hébergé par :</strong>
              <br />
              <br />
              Amazon Web Services LLC
              <br />
              P.O. Box 81226
              <br />
              Seattle, WA 98108-1226
              <br />
              <br />
              <strong>Propriété intellectuelle</strong>
              <br />
              <br />
              Ce site appartient et est exploité par Brik. Tous les éléments composant le site, y incluant les marques,
              logos, noms de domaine et autres signes distinctifs apparaissant sur le site www.
              {process.env.DOMAIN}
              sont protégés par la législation en vigueur sur la propriété intellectuelle et le droit d'auteur, et
              appartiennent à Brik ou font l'objet d'une autorisation d'utilisation. Tous les droits de reproduction
              sont réservés. La reproduction sur support papier est autorisée sous réserve de respecter l'intégralité
              des documents reproduits (pas de modification ni d'altération). Toute exploitation non autorisée du site
              ou de son contenu engagerait votre responsabilité et constituerait une contrefaçon sanctionnée par les
              articles L335-2 et suivants du Code de la Propriété Intellectuelle. Limitations de responsabilité
              <br />
              Brik ne peut garantir l'exactitude, la complétude, l'actualité des informations diffusées sur le Site.
              Brik met tout en œuvre pour diffuser des informations exactes et mises à jour.
              <br />
              Vous reconnaissez utiliser ces informations sous votre responsabilité.
              <br />
              <br />
              <strong>Brik ne peut être tenue responsable :</strong>
              <br />
              <br />
              des erreurs ou omissions des informations diffusées sur le site,
              <br />
              des dommages directs ou indirects qui pourraient résulter de l'accès ou de l'utilisation du site.
              <br />
              <br />
              <strong>Disponibilité du site</strong>
              <br />
              <br />
              Le site de Brik est accessible 24 heures sur 24 et 7 jours sur 7 à l'exception des cas de force majeure,
              difficultés informatiques, difficultés liées aux réseaux de télécommunications ou difficultés techniques.
              <br />
              Pour des raisons de maintenance, Brik pourra interrompre l'accès au site.
              <br />
              <br />
              <br />
              <br />
            </p>
          </div>

          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
