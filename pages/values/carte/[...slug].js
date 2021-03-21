import axios from 'axios';
import { ResponsiveCSS } from 'common/src/assets/css/responsive';
import { ResetCSS } from 'common/src/assets/css/style';
import locationIconBlack from 'common/src/assets/image/brik/locationiconblack.png';
import { DrawerProvider } from 'common/src/contexts/DrawerContext';
import { theme } from 'common/src/theme/Brik';
import { ContentWrapper, GlobalStyle } from 'containers/Brik/brik.style';
import Footer from 'containers/Brik/Footer';
import Navbar from 'containers/Brik/Navbar';
import SideMenu from 'containers/Brik/SideMenu';

import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, { Fragment, useEffect, useState } from 'react';
import Geocode from 'react-geocode';
import TagManager from 'react-gtm-module';
import { useDispatch, useSelector } from 'react-redux';
import Sticky from 'react-stickynode';
import { actions } from 'store/actions/apiActions';
import { actions as actionsSearch } from 'store/actions/searchActions';
import { ThemeProvider } from 'styled-components';
import config from '../../../config';

if (process.browser && process.env.NODE_ENV !== 'development') {
  TagManager.initialize(config.tagManager);
}

// Reverse geocoding config :
Geocode.setApiKey('AIzaSyBnf0WJj1Xu2Bq9hUnxCvS3GmiHpSiHY4o');
Geocode.setLanguage('fr');
Geocode.setRegion('fr');

var int2 = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  currencyDisplay: 'symbol',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
});

// Routes
const baseUrl = process.env.NEXT_PUBLIC_DVF_ROOT_URL;
const requestType = 'miniList';

// Get transactions list
const fetchTransactions = async (
  address,
  dispatch,
  priceFilter,
  postal_code,
  filters,
  scope,
  mapInfos,
  limit,
  distanceOLD
) => {
  dispatch(actions.getMapTransactions());

  //TODO: improve this scale.
  let distance = 1000;
  if (mapInfos.zoom >= 20) {
    distance = 100;
  } else if (mapInfos.zoom === 19) {
    distance = 200;
  } else if (mapInfos.zoom === 18) {
    distance = 400;
  } else if (mapInfos.zoom === 17) {
    distance = 800;
  } else {
    distance = 1600;
  }

  let params = {
    requestType,
    distance: distance,
    limit: limit,
    code_type_local: filters.join(','),
    value_min: priceFilter[0],
    value_max: priceFilter[1],
    perimeter: 'district'
  };
  if (address !== null) {
    params.address = address;
  } else {
    params = {
      ...params,
      lat: mapInfos?.center?.lat,
      lon: mapInfos?.center?.lng
    };
  }
  const data = await axios.get(`${baseUrl}?${new URLSearchParams(params)}`);

  //this trick is because if we set a low amount of transaction, eric's api take too long time to responde. In waiting for improvements on his side.
  //we have a high limit but we reduce here.

  dispatch(actions.getMapTransactionsResponse(data?.data?.data.splice(0, 300)));
  return data;
};

export default () => {
  const [mapGoogle, setMapGoogle] = useState(null);
  const [mapDistance, setMapDistance] = useState(999);
  const [numberOfTransactionsLimit, setNumberOfTransactionsLimit] = useState(1000);

  const [mapLatLong, setMapLatLong] = useState({
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 19
  });
  const [priceFilter, setPriceFilter] = useState([0, 10000000]);
  const {
    search: { address, postal_code, filters, scope, lat: initialLat, lng: initialLng },
    api: { mapTransactionData: dataMap, isFetchingMapTransactions: isFetchingMapTransactionsBool, needsRefresh }
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const inputToSlug = (addr, postalcode, filters, scope) => {
    let filtersSlug = [];
    let filtersName = {
      // We want them as string for SEO reasons.
      1: 'maison',
      4: 'bureau',
      2: 'appartement',
      3: 'dependance',
      999: 'terrain'
    };
    filters?.forEach(filterId => {
      filtersSlug.push(filtersName[filterId]);
    });
    let scopes = ['quartier', 'ville', 'departement'];

    let slug = addr?.split(', ').reverse();
    slug.splice(0, 1);
    slug.splice(1, 0, postalcode);

    return (
      '/' +
      slug
        .join('/')
        .replace(/\s+/g, '+')
        .toLowerCase() +
      '/' +
      filtersSlug.join('+') +
      '/' +
      scopes[scope - 1]
    );
  };

  const router = useRouter();
  const [currentSlug, setCurrentSlug] = useState(null);

  //kind of MAIN.
  useEffect(() => {
    if (initialLat == null || initialLng == null) {
      if (router.query.slug !== undefined) {
        let slug = router.query.slug;
        let oldSlug = slug.slice(0);
        setCurrentSlug('/' + oldSlug.join('/'));
        let sentFilters = oldSlug[oldSlug.length - 2].split('+');
        let sentScope = oldSlug[oldSlug.length - 1];
        let postalcode = null;
        let scopes = { quartier: 1, ville: 2, departement: 3 };
        postalcode = slug[1];
        slug.pop();
        slug.pop();
        slug.reverse();
        slug.splice(1, 1);
        slug = slug.join(', ').replace(/[+]/g, ' '); // Rebuild adress replacing + by space
        // Get filters
        let filtersSlug = [];
        let filtersId = {
          // We want them as id from string
          maison: '1',
          bureau: '4',
          appartement: '2',
          dependance: '3',
          terrain: '999'
        };
        sentFilters.forEach(filterString => {
          filtersSlug.push(filtersId[filterString]);
        });

        geocodeByAddress(slug).then(
          results => {
            getLatLng(results[0]).then(({ lat, lng }) => {
              dispatch(
                actionsSearch.enterSearch(
                  slug,
                  postalcode,
                  filtersSlug, // Default all filters,
                  scopes[sentScope],
                  lat,
                  lng
                )
              );
            });
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }, [router]);

  useEffect(() => {
    if (initialLat && initialLng) {
      setMapLatLong({
        center: {
          lat: initialLat,
          lng: initialLng
        },
        zoom: 19
      });
    }

    if (address && postal_code && filters && scope) {
      let slugNew = inputToSlug(address, postal_code, filters, scope);
      if (slugNew.split('/').length == 6) {
        setCurrentSlug(inputToSlug(address, postal_code, filters, scope));
        window.history.pushState(
          '',
          '',
          window.location.pathname
            .split('/')
            .splice(0, 3)
            .join('/') + inputToSlug(address, postal_code, filters, scope)
        );
      }
    }
    // End slug and URL updates
  }, [address, postal_code, filters, scope, initialLat, initialLng]);

  useEffect(() => {
    if (mapLatLong?.center?.lat && mapLatLong?.center?.lng) {
      fetchTransactions(
        null,
        dispatch,
        priceFilter,
        postal_code,
        filters,
        scope,
        mapLatLong,
        numberOfTransactionsLimit,
        mapDistance
      );
    }
  }, [priceFilter, mapLatLong]);

  const [showSellDetails, setShowSellDetails] = useState(false);
  const [sidePanelInfos, setSidePanelInfos] = useState({
    adresse: '',
    type: '',
    surface: 0,
    soldFor: 0,
    soldDate: ''
  });

  // Component that will be rendered on the map
  const AnyReactComponent = ({ price, doShowPlusvalue, plusvalue, transactionDetails }) => (
    <>
      <div className="map-marker-component" onClick={() => changeShowSellDetails(transactionDetails)}>
        {doShowPlusvalue && plusvalue && (
          <div className={`map-plus-value ${plusvalue.includes('-') ? 'color-red-map' : 'color-green-map'} `}>
            {plusvalue}€
          </div>
        )}

        <div className="map-price">{price}</div>

        <img className="map-icon-black" src={locationIconBlack} />
      </div>
    </>
  );
  // End of the map rendered component

  //#region "Plus value"
  const [showPlusValue, setShowPlusFilter] = useState(false);

  function changePlusValueFilter() {
    setShowPlusFilter(!showPlusValue);
  }
  //#endregion "Plus value"

  //#region "Cadastre"
  const [showParcels, setShowParcels] = useState(false);
  const [parcels, setParcels] = useState(null);

  useEffect(() => {
    if (mapGoogle) {
      if (showParcels && !parcels) {
        loadParcels();
      } else if (showParcels && parcels) {
        displayParcels();
      } else {
        mapGoogle.data.forEach(feature => {
          mapGoogle.data.remove(feature);
        });
      }
    }
  }, [showParcels]);

  useEffect(() => {
    if (parcels) {
      displayParcels();
    }
  }, [parcels]);

  const changeShowParcels = async () => {
    setShowParcels(!showParcels);
  };

  const displayParcels = async () => {
    if (mapGoogle) {
      mapGoogle?.data.addGeoJson(parcels.data);
      // Layer styling
      mapGoogle?.data.setStyle(() => {
        return {
          fillColor: '#185490',
          strokeWeight: 1
        };
      });
    }
  };
  const loadParcels = async () => {
    let codeInsee = await axios.get(
      `https://geo.api.gouv.fr/communes?lat=${mapLatLong?.center?.lat}&lon=${mapLatLong?.center?.lng}&fields=code&format=json`
    );
    let parcelles = await axios.get(
      'https://cadastre.data.gouv.fr/bundler/cadastre-etalab/communes/' +
        codeInsee?.data[0]?.code +
        '/geojson/parcelles'
    );
    setParcels(parcelles);
  };
  //#endregion "Cadastre"

  const onGoogleApiLoaded = async map => {
    setMapGoogle(map);
  };
  // Map settings

  const changeTransactionsMap = e => {
    if (mapGoogle) {
      setMapLatLong({
        center: {
          lat: e?.center?.lat,
          lng: e?.center?.lng
        },
        zoom: e.zoom
      });
    }
  };
  // End map settings

  // Side panel info morphing
  const changeShowSellDetails = async id_mutation => {
    const baseUrl = process.env.NEXT_PUBLIC_DVF_ROOT_URL;
    const requestType = 'mutation';
    const params = {
      requestType,
      mutationId: id_mutation
    };
    await axios.get(`${baseUrl}?${new URLSearchParams(params)}`).then(transactionDetails => {
      const currDetail = transactionDetails.data.data[0];
      setSidePanelInfos({
        adresse: currDetail.adresse,
        type: currDetail.type_local,
        surface: currDetail.surface,
        soldFor: currDetail.valeur_fonciere_format,
        soldDate: currDetail.date_vente_format,
        plusValue: currDetail.plus_value_format,
        ansPlusValue: currDetail.nb_ans_plus_value,
        moisPlusValue: currDetail.nb_mois_plus_value,
        centerValue: { lat: currDetail.latitude, lng: currDetail.longitude }
      });
      setShowSellDetails(true);
    });
  };

  // Create all the component according to API response
  const [mapRenderedComponent, setMapRenderedComponent] = useState([]);
  useEffect(() => {
    const mapComponents = dataMap?.map((item, key) => (
      <AnyReactComponent
        key={key}
        lat={item.latitude}
        lng={item.longitude}
        price={item.valeur_fonciere_format}
        plusvalue={item.plus_value_format}
        doShowPlusvalue={showPlusValue}
        transactionDetails={item.id_mutation}
      />
    ));
    setMapRenderedComponent(mapComponents);
  }, [dataMap, showPlusValue]);

  //#region "priceSlide"

  const [priceSliderValue, setPriceSliderValue] = useState([0, 100]);
  const priceMarks = [
    {
      value: 0,
      scaledValue: 0,
      label: '0'
    },
    {
      value: 25,
      scaledValue: 100000,
      label: '100k'
    },
    {
      value: 50,
      scaledValue: 500000,
      label: '500k'
    },
    {
      value: 75,
      scaledValue: 1000000,
      label: '1M'
    },
    {
      value: 100,
      scaledValue: 10000000,
      label: 'Max'
    }
  ];

  const priceScale = value => {
    const previousMarkIndex = Math.floor(value / 25);
    const previousMark = priceMarks[previousMarkIndex];
    const remainder = value % 25;
    if (remainder === 0) {
      return previousMark?.scaledValue;
    }
    const nextMark = priceMarks[previousMarkIndex + 1];
    const increment = (nextMark.scaledValue - previousMark.scaledValue) / 25;
    return remainder * increment + previousMark.scaledValue;
  };

  const changePriceFilter = value => {
    setPriceSliderValue(value);
  };

  const changePriceFilterCommited = value => {
    setPriceFilter([priceScale(priceSliderValue[0]), priceScale(priceSliderValue[1])]);
  };

  //#endregion "priceSlide"

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
        <Head>
          <title>
            Brik | Carte |{' '}
            {address?.replace(/\b[a-z]/g, function(letter) {
              return letter.toUpperCase();
            })}
          </title>
          <meta name="theme-color" content="#185490" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

          <meta name="Description" content="Parcourez la carte des transactions et des plus values immobilières" />

          {/* Load google fonts */}
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
              body{
                overflow: hidden;
              }
            }`}
          </style>
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

          <div className="map-container">
            <div style={{ height: '95vh', width: '100%' }}>
              {process.browser && (
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: 'AIzaSyBnf0WJj1Xu2Bq9hUnxCvS3GmiHpSiHY4o'
                  }}
                  center={mapLatLong?.center}
                  defaultZoom={mapLatLong?.zoom}
                  onChange={e => changeTransactionsMap(e)}
                  options={map => ({
                    tilt: 0,
                    streetViewControl: false,
                    zoomControlOptions: {
                      position: map.ControlPosition.RIGHT_CENTER
                    },
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                      style: map.MapTypeControlStyle.HORIZONTAL_BAR,
                      position: map.ControlPosition.BOTTOM_CENTER,
                      mapTypeIds: [map.MapTypeId.ROADMAP, map.MapTypeId.SATELLITE, map.MapTypeId.HYBRID]
                    }
                  })}
                  onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map)}
                >
                  {mapRenderedComponent}
                </GoogleMapReact>
              )}
            </div>

            <div className="map-settings map-settings-cadastre">
              <p>Afficher le cadastre</p>
              <input
                className="tgl tgl-light"
                id="cbCadastre"
                type="checkbox"
                checked={showParcels}
                onClick={() => changeShowParcels()}
              />
              <label className="tgl-btn" htmlFor="cbCadastre"></label>
            </div>

            <div className="map-settings map-settings-gain">
              <p>Afficher les plus values</p>
              <input
                className="tgl tgl-light"
                id="cbGain"
                type="checkbox"
                checked={showPlusValue}
                onClick={() => changePlusValueFilter()}
              />
              <label className="tgl-btn" htmlFor="cbGain"></label>
            </div>

            <div className="map-price-range">
              <p>Filtrer par prix</p>
              <Range
                min={0}
                step={1}
                max={100}
                value={priceSliderValue}
                scale={priceScale}
                onChange={e => changePriceFilter(e)}
                onAfterChange={e => changePriceFilterCommited(e)}
              />
              <p>
                {priceSliderValue[0] == 0 ? 'du minimum' : 'de ' + int2.format(priceScale(priceSliderValue[0]))}{' '}
                {priceSliderValue[1] == 100 ? 'au maximum' : 'à ' + int2.format(priceScale(priceSliderValue[1]))}
              </p>
            </div>

            {showSellDetails && (
              <div className="map-sell-details">
                <span onClick={() => setShowSellDetails(false)} className="glyph-icon flaticon-plus-symbol" />
                <h1>
                  <strong>{sidePanelInfos.adresse}</strong>
                  <br />
                </h1>
                <hr />
                <h2>{sidePanelInfos.type}</h2>

                <ul>
                  <li>{sidePanelInfos.surface}m²</li>
                </ul>

                <p>Vendu en {sidePanelInfos.soldDate} pour</p>
                <span className="map-grey-price">{sidePanelInfos.soldFor?.toLocaleString()} €</span>
                {sidePanelInfos.plusValue && (
                  <span>
                    <p>Plus value</p>
                    <h3>
                      <span className={sidePanelInfos.plusValue.includes('-') ? 'color-red-map' : 'color-green-map'}>
                        <strong>{sidePanelInfos.plusValue + ' €'}</strong>
                      </span>{' '}
                      en {sidePanelInfos.ansPlusValue * 12 + sidePanelInfos.moisPlusValue} mois
                    </h3>
                  </span>
                )}

                <div onClick={() => setMapLatLong(sidePanelInfos.centerValue)}>Recentrer sur cette adresse</div>
              </div>
            )}
          </div>

          <SideMenu slug={currentSlug} />

          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
