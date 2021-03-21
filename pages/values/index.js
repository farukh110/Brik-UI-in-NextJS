import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/src/theme/Brik';
import { ResetCSS } from 'common/src/assets/css/style';
import { ResponsiveCSS } from 'common/src/assets/css/responsive';
import { GlobalStyle, ContentWrapper } from 'containers/Brik/brik.style';
import { DrawerProvider } from 'common/src/contexts/DrawerContext';
import Navbar from 'containers/Brik/Navbar';
import SideMenu from 'containers/Brik/SideMenu';
import Footer from 'containers/Brik/Footer';
import SearchbarValue from 'containers/Brik/SearchBar';
import IndiceBrik from 'common/src/components/IndiceBrik';

import Progress from 'react-progressbar';
import { Doughnut } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import Router from 'next/router';

import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import Geocode from 'react-geocode';

import { useDispatch } from 'react-redux';
import { actions } from 'store/actions/searchActions';

// Assets
import searchIcon from 'common/src/assets/image/brik/location.png';

// Reverse geocoding config :
Geocode.setApiKey('AIzaSyBnf0WJj1Xu2Bq9hUnxCvS3GmiHpSiHY4o');
Geocode.setLanguage('fr');
Geocode.setRegion('fr');

export default () => {
  const [adresseValeur, setAdresseValeur] = useState(null);
  const dispatch = useDispatch();

  function inputToSlug(addr, postalcode) {
    // Exemple : Converts "69 Rue de Bercy, Paris, France" to --> "/france/75012/paris/69+rue+de+bercy/[FILTERS]"
    let slug = addr.split(', ').reverse();
    slug.splice(0, 1);
    slug.splice(1, 0, postalcode);
    // The default filter is hardcoded as we're always loading everything on the first search
    return '/' + slug.join('/').replace(/\s+/g, '+').toLowerCase() + '/maison+bureau+appartement/quartier';
  }

  function doSearch(adresse) {
    let postalCode = null;
    let slug = null;
    geocodeByAddress(adresse).then((results) => {
      if (results[0].formatted_address.match(/([0-9]{4,6})\w+/) == null) {
        getLatLng(results[0]).then(({ lat, lng }) => {
          Geocode.fromLatLng(lat, lng).then((response) => {
            postalCode = response.results[0].formatted_address.match(/([0-9]{4,6})\w+/)[0]; // Get postal code from formatted adress
            slug = inputToSlug(adresse, postalCode);
            dispatch(
              actions.enterSearch(
                adresse,
                postalCode,
                ['1', '2', '3', '4', '999'], // Default all filters,
                1
              )
            );
          });
        });
      } else {
        postalCode = results[0].formatted_address.match(/([0-9]{4,6})\w+/)[0]; // Get postal code from formatted adress
        slug = inputToSlug(adresse, postalCode);
        dispatch(
          actions.enterSearch(
            adresse,
            postalCode,
            ['1', '2', '3', '4', '999'], // Default all filters,
            1 // Default scope,
          )
        );
      }
      Router.push('/values/evolution' + slug);
    });
  }

  function onAddressSelect(desc) {
    doSearch(desc);
  }

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <title>Brik | Etudier</title>
          <meta name="theme-color" content="#185490" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

          <meta name="Description" content="Valeurs immoblière Brik" />

          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100&display=swap"
            rel="stylesheet"
          />
          <script
            type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBnf0WJj1Xu2Bq9hUnxCvS3GmiHpSiHY4o&libraries=places"
          ></script>
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

          <div className="search-page-container">
            <h1>
              Étudiez <strong>l’attractivité immobilière</strong> de l’adresse de votre choix !
            </h1>

            <p>
              Tapez l’adresse que vous souhaitez étudier et découvrez son{' '}
              <strong>
                dynamisme foncier, les plus-values passées et estimées pour l’avenir, l’historique des transactions
              </strong>{' '}
              et bien plus encore.
            </p>

            <img src={searchIcon} />
            <GooglePlacesAutocomplete
              placeholder="Rechercher une adresse à étudier"
              autocompletionRequest={{
                types: ['address'],
                componentRestrictions: {
                  country: ['fr']
                }
              }}
              onSelect={({ description }) => {
                onAddressSelect(description);
              }}
              disabled={adresseValeur !== null}
            />
          </div>

          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
