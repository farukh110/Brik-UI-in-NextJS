import React, { useState } from 'react';
import Router from 'next/router';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import Section, { ContentWrapper, BannerContent, Subscribe, LandingSearch } from './banner.style';

import locationIcon from 'common/src/assets/image/brik/map-marker.svg';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import Geocode from 'react-geocode';

import { useDispatch } from 'react-redux';
import { actions } from 'store/actions/searchActions';

// Reverse geocoding config :
Geocode.setApiKey('AIzaSyBnf0WJj1Xu2Bq9hUnxCvS3GmiHpSiHY4o');
Geocode.setLanguage('fr');
Geocode.setRegion('fr');

const Banner = () => {
  const [adresseValeur, setAdresseValeur] = useState(null);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
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
    setSearchButtonClicked(true);
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
                ['1', '2', '4'], // Default : 'maison', 'bureau', 'appartement',
                1
              )
            );
            Router.push(`/values/evolution${slug}`);
          });
        });
      } else {
        postalCode = results[0].formatted_address.match(/([0-9]{4,6})\w+/)[0]; // Get postal code from formatted adress
        slug = inputToSlug(adresse, postalCode);
        dispatch(
          actions.enterSearch(
            adresse,
            postalCode,
            ['1', '2', '4'], // Default : 'maison', 'bureau', 'appartement',
            1 // Default scope,
          )
        );
        Router.push(`/values/evolution${slug}`);
      }
    });
  }

  function onAddressSelect(desc) {
    setAdresseValeur(desc);
  }

  return (
    <Section id="home">
      <Container width="1440px">
        <ContentWrapper>
          <BannerContent>
            <Heading />
            <LandingSearch>
              <img className="icon-location" src={locationIcon} alt="Location" />
              <p className="banner-caption">
                Commencez par indiquer l’<strong>adresse du bien</strong> que vous souhaitez étudier
              </p>
              <Subscribe onClick={() => (adresseValeur !== null ? setAdresseValeur(null) : '')}>
                <GooglePlacesAutocomplete
                  placeholder="Entrez une rue, adresse ou ville..."
                  autocompletionRequest={{
                    componentRestrictions: {
                      country: ['fr']
                    }
                  }}
                  onSelect={({ description }) => {
                    onAddressSelect(description);
                  }}
                  disabled={adresseValeur !== null}
                />
              </Subscribe>
              {adresseValeur && (
                <span
                  className={'btn-blue landing-search ' + (searchButtonClicked ? 'landing-search-active' : '')}
                  onClick={() => doSearch(adresseValeur)}
                >
                  Etudier cette zone
                </span>
              )}

              <p className={'rgpd-title ' + (adresseValeur ? 'mobile-only-margin-top' : '')}>
                Les données sont totalement confidentielles et ne sont pas exploitées hors de l’affichage des résultats.{' '}
                <br />
                {/* <a className="landing-link" href="#">
                  Lire notre politique RGPD
                </a> */}
              </p>
              <p className="sponsoredBy">
                <sup>*</sup> Gratuite pour 50 consultations.
              </p>
            </LandingSearch>
          </BannerContent>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Banner;
