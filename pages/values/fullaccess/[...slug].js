import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import 'rc-slider/assets/index.css';
import { actions as actionsSearch } from 'store/actions/searchActions';
import { actions } from 'store/actions/apiActions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useRequestUser } from 'common/src/hooks/useRequestUser';
import Link from 'common/src/components/Link';
import DatePickerInput from 'common/src/components/DatePicker/DatePickerInput';
import Select from 'common/src/components/Select/index';
import { Range } from 'rc-slider';
import 'react-datepicker/dist/react-datepicker.css';
import TagManager from 'react-gtm-module';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import config from '../../../config';
import caretIcon from 'common/src/assets/image/brik/values/icons/caret.svg';
 
if (process.browser && process.env.NODE_ENV !== 'development') {
  TagManager.initialize(config.tagManager);
}

// Number formating for EUR price
var int2 = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  currencyDisplay: 'symbol',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
});

// Routes
const baseUrl = process.env.NEXT_PUBLIC_DVF_ROOT_URL;
const requestType = 'fullAccess';

// Get transactions list
const fetchTransactions = async (
  address,
  dispatch,
  searchFilter = null,
  postal_code,
  filters,
  scope,
  sorting,
  order
) => {
  dispatch(actions.getTransactions());

  // Default filters if filters null
  if (searchFilter == null) {
    searchFilter = {
      surface_totale_min: 1,
      surface_totale_max: 99999999,
      valeur_fonciere_min: 1,
      valeur_fonciere_max: 99999999,
      date_mutation_min: '2014-01-01',
      date_mutation_max: '2019-12-30'
    };
  }

  // Handle max and min
  searchFilter.valeur_fonciere_max == 5000000 ? (searchFilter.valeur_fonciere_max = 99999999) : '';
  searchFilter.valeur_fonciere_min == 1 ? (searchFilter.valeur_fonciere_min = 1) : '';
  searchFilter.surface_totale_max == 1000 ? (searchFilter.surface_totale_max = 999999) : '';

  let params = {
    requestType,
    code_type_local: filters.join(','),
    limit: 200,
    surface_min: searchFilter.surface_totale_min,
    surface_max: searchFilter.surface_totale_max,
    value_min: searchFilter.valeur_fonciere_min,
    value_max: searchFilter.valeur_fonciere_max,
    date_min: searchFilter.date_mutation_min,
    date_max: searchFilter.date_mutation_max,
    sort: sorting,
    order: order
  };

  switch (scope) {
    case 1:
      params = {
        ...params,
        perimeter: 'district',
        address: address
      };
      break;

    case 2:
      params.cp = postal_code;
      params.perimeter = 'city';
      break;

    case 3:
      params.dpt = postal_code.substring(0, 2);
      params.perimeter = 'department';
      break;

    default:
      break;
  }

  const data = await axios
    .get(`${baseUrl}?${new URLSearchParams(params)}`, { withCredentials: true })
    .then((response) => {
      dispatch(actions.getTransactionsResponse(response));
    })
    .catch((error) => {
      // Catch error if user is not logged in (or if something goes wrong server-side)
      console.log(error.response.status);
    });
};

const FullAccess = () => {
  const {
    search: { address, postal_code, filters, scope },
    api: { transactionData: data, needsRefresh }
  } = useSelector((state) => state);
  const [sortingValue, setSortingValue] = useState('valeur_fonciere');
  const [orderValue, setOrderValue] = useState('DESC');
  const [showFilter, setShowFilter] = useState(false);
  const [isRefreshingData, setIsRefreshingData] = useState(false);
  const { isFetchingUser, fetchResponse, fetchError } = useRequestUser();
  const [filterParams, setFilterParams] = useState({
    priceFilterEnabled: true,
    valeur_fonciere_min: 0,
    valeur_fonciere_max: 5000000,

    surfaceFilterEnabled: true,
    surface_totale_min: 0,
    surface_totale_max: 1000,

    soldDateEnabled: true,
    date_mutation_min: new Date('2014-01-01'),
    date_mutation_max: new Date()
  });

  const dispatch = useDispatch();
  function inputToSlug(addr, postalcode, filters, scope) {
    let filtersSlug = [];
    let filtersName = {
      // We want them as string for SEO reasons.
      1: 'maison',
      4: 'bureau',
      2: 'appartement',
      3: 'dependance',
      999: 'terrain'
    };
    filters.forEach((filterId) => {
      filtersSlug.push(filtersName[filterId]);
    });
    let scopes = ['quartier', 'ville', 'departement'];
    let slug = addr?.split(', ').reverse();
    slug?.splice(0, 1);
    slug?.splice(1, 0, postalcode);

    return (
      '/' + slug?.join('/').replace(/\s+/g, '+').toLowerCase() + '/' + filtersSlug.join('+') + '/' + scopes[scope - 1]
    );
  }

  // Check if address set otherwise fetch from URl otherwise route index
  const router = useRouter();
  const [currentSlug, setCurrentSlug] = useState(router.query.slug);
  if (address == null) {
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
      sentFilters.forEach((filterString) => {
        filtersSlug.push(filtersId[filterString]);
      });
      // Dispatch adresse we processed from URL slug
      dispatch(
        actionsSearch.enterSearch(
          slug,
          postalcode,
          filtersSlug, // Default all filters,
          scopes[sentScope]
        )
      );
    }
  }

  useEffect(() => {
    if (data?.data.data.length == 64654 || (!data && address) || !needsRefresh || data?.data.count !== 200) {
      // Format data or apply filter :
      let params = {};
      if (filterParams.surfaceFilterEnabled) {
        params.surface_totale_min = filterParams.surface_totale_min;
        params.surface_totale_max = filterParams.surface_totale_max;
      }
      if (filterParams.priceFilterEnabled) {
        params.valeur_fonciere_min = filterParams.valeur_fonciere_min;
        params.valeur_fonciere_max = filterParams.valeur_fonciere_max;
      }
      if (filterParams.soldDateEnabled) {
        params.date_mutation_min = formatDate(filterParams.date_mutation_min);
        params.date_mutation_max = formatDate(filterParams.date_mutation_max);
      }
      // Fetch transaction
      fetchTransactions(address, dispatch, params, postal_code, filters, scope, sortingValue, orderValue);
      // Slug and URL updates
      let slugNew = inputToSlug(address, postal_code, filters, scope);
      if (slugNew.split('/').length == 6) {
        setCurrentSlug(inputToSlug(address, postal_code, filters, scope));
        window.history.pushState(
          '',
          '',
          window.location.pathname.split('/').splice(0, 3).join('/') + inputToSlug(address, postal_code, filters, scope)
        );
      }
      // End slug and URL updates
      dispatch(actions.needsRefreshDone(true));
    }
    return () => {};
  }, [data, address, needsRefresh, dispatch]);

  // Selection prix
  function handleChangePriceEnabled() {
    setFilterParams({
      ...filterParams,
      priceFilterEnabled: !filterParams.priceFilterEnabled
    });
  }
  function handleChangePriceValues(e) {
    setFilterParams({
      ...filterParams,
      valeur_fonciere_min: e[0],
      valeur_fonciere_max: e[1]
    });
  }

  // Selection surface
  function handleChangeSurfaceEnabled() {
    setFilterParams({
      ...filterParams,
      surfaceFilterEnabled: !filterParams.surfaceFilterEnabled
    });
  }
  function handleChangeSurfaceValues(e) {
    setFilterParams({
      ...filterParams,
      surface_totale_min: e[0],
      surface_totale_max: e[1]
    });
  }

  // Selection des dates
  function handleChangeDateEnabled() {
    setFilterParams({
      ...filterParams,
      soldDateEnabled: !filterParams.soldDateEnabled
    });
  }
  function formatDate(date) {
    let newDate = date.toLocaleDateString().split('/');
    return newDate[2] + '-' + newDate[1] + '-' + newDate[0];
  }
  function handleChangeDateStart(e) {
    setFilterParams({ ...filterParams, date_mutation_min: e });
  }
  function handleChangeDateEnd(e) {
    setFilterParams({ ...filterParams, date_mutation_max: e });
  }
  // Get type
  function getLocalType(item) {
    let stringType = '';
    item.appartement > 0 ? (stringType += ' Appartement') : null;
    item.maison > 0 ? (stringType += ' Maison') : null;
    item.dependance > 0 ? (stringType += ' Dépendance') : null;
    item.local > 0 ? (stringType += ' Commerce / Bureau') : null;
    return stringType;
  }

  // Sorting :
  function handleSortingChange(sortValue) {
    setSortingValue(sortValue);
    let params = {
      surface_totale_min: 0,
      surface_totale_max: 25000,
      valeur_fonciere_min: 5000,
      valeur_fonciere_max: 150000,
      date_mutation_min: '2014-01-01',
      date_mutation_max: '2019-12-30'
    };
    if (filterParams.surfaceFilterEnabled) {
      params.surface_totale_min = filterParams.surface_totale_min;
      params.surface_totale_max = filterParams.surface_totale_max;
    }
    if (filterParams.priceFilterEnabled) {
      params.valeur_fonciere_min = filterParams.valeur_fonciere_min;
      params.valeur_fonciere_max = filterParams.valeur_fonciere_max;
    }
    if (filterParams.soldDateEnabled) {
      params.date_mutation_min = formatDate(filterParams.date_mutation_min);
      params.date_mutation_max = formatDate(filterParams.date_mutation_max);
    }
    fetchTransactions(address, dispatch, params, postal_code, filters, scope, sortValue, orderValue);
  }

  // Renew Search (changing current adresse lookup)
  function renewSearch(newAdress, postal_code, goToMap) {
    dispatch(
      actionsSearch.enterSearch(
        newAdress,
        postal_code, // Get postal code from formatted adress
        filters, // Default all filters,
        scope // Default scope
      )
    );
    dispatch(actions.needsRefreshDone(false));
    // Should we route to map ?
    if (goToMap) {
      router.push('/values/carte' + inputToSlug(newAdress, postal_code));
    }
  }

  // Order :
  function handleOrderChange(orderingValue) {
    setOrderValue(orderingValue);
    let params = {
      surface_totale_min: 0,
      surface_totale_max: 25000,
      valeur_fonciere_min: 5000,
      valeur_fonciere_max: 150000,
      date_mutation_min: '2014-01-01',
      date_mutation_max: '2019-12-30'
    };
    if (filterParams.surfaceFilterEnabled) {
      params.surface_totale_min = filterParams.surface_totale_min;
      params.surface_totale_max = filterParams.surface_totale_max;
    }
    if (filterParams.priceFilterEnabled) {
      params.valeur_fonciere_min = filterParams.valeur_fonciere_min;
      params.valeur_fonciere_max = filterParams.valeur_fonciere_max;
    }
    if (filterParams.soldDateEnabled) {
      params.date_mutation_min = formatDate(filterParams.date_mutation_min);
      params.date_mutation_max = formatDate(filterParams.date_mutation_max);
    }
    fetchTransactions(address, dispatch, params, postal_code, filters, scope, sortingValue, orderingValue);
  }
  // Function to refresh transaction

  function refreshTransactions() {
    setIsRefreshingData(true);
    let params = {
      surface_totale_min: 0,
      surface_totale_max: 25000,
      valeur_fonciere_min: 5000,
      valeur_fonciere_max: 150000,
      date_mutation_min: '2014-01-01',
      date_mutation_max: '2019-12-30'
    };
    if (filterParams.surfaceFilterEnabled) {
      params.surface_totale_min = filterParams.surface_totale_min;
      params.surface_totale_max = filterParams.surface_totale_max;
    }
    if (filterParams.priceFilterEnabled) {
      params.valeur_fonciere_min = filterParams.valeur_fonciere_min;
      params.valeur_fonciere_max = filterParams.valeur_fonciere_max;
    }
    if (filterParams.soldDateEnabled) {
      params.date_mutation_min = formatDate(filterParams.date_mutation_min);
      params.date_mutation_max = formatDate(filterParams.date_mutation_max);
    }
    fetchTransactions(address, dispatch, params, postal_code, filters, scope, sortingValue, orderValue).then(() => {
      setIsRefreshingData(false);
      setShowFilter(false);
    });
  }

  // Tableau datas
  const itemsTable = data?.data.data.map((item, key) => (
    <tr key={key}>
      <td className="result-adresse">
        <div
          className="circle-grey cursor-pointer map-button"
          onClick={() =>
            renewSearch(item.adresse.replace(',', '') + ', ' + item.nom_commune + ', France', item.code_postal, true)
          }
        ></div>
        <span
          className="cursor-pointer"
          onClick={() =>
            renewSearch(item.adresse.replace(',', '') + ', ' + item.nom_commune + ', France', item.code_postal, false)
          }
        >
          {item.adresse}
        </span>
        <span className="result-distance">({item.distance}m)</span>
        <span className="result-undertext-nm">
          {item.nombre_pieces_principales_total > 0 ? item.nombre_pieces_principales_total + ' pièces - ' : ''}
          {Math.round(item.surface_totale)}m2 - {getLocalType(item)}
        </span>
      </td>
      <td>
        {new Date(item.date_mutation.split('/').reverse().join('-')).toLocaleDateString()}
        <span className="result-undertext-nm">Date de transaction</span>
      </td>
      <td>
        {int2.format(item.prix_m2)}
        <span className="result-undertext-nm">Prix du m²</span>
      </td>
      <td className="color-blue">
        {int2.format(item.valeur_fonciere)}
        <span className="result-undertext-nm">Prix de la transaction</span>
      </td>
      {/* <td className="color-green">
        {item.plus_value ? item.plus_value + '€' : <span></span>}
        <span className="result-undertext-nm">
          {item.pourcent_plus_value ? item.pourcent_plus_value + '%' : ''}
        </span>
      </td> */}
    </tr>
  ));
  // End Tableau datas

  // Accordion datas
  const accordionItems = data?.data.data.map((item, key) => (
    <AccordionItem key={key}>
      <AccordionItemHeading>
        <AccordionItemButton>
          {item.adresse} <br />{' '}
          <span className="accordion-title-price">
            {int2.format(item.valeur_fonciere)} - {int2.format(item.prix_m2)} / m²
          </span>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <ul>
          <li>
            <span>Type de bien :</span>
            <strong>{getLocalType(item)}</strong>
          </li>
          <li>
            <span>Surface :</span>
            <strong>{Math.round(item.surface_totale)}m²</strong>
          </li>
          <li>
            <span>Date :</span>
            <strong>{new Date(item.date_mutation.split('/').reverse().join('-')).toLocaleDateString()}</strong>
          </li>
          <li>
            <span>Prix du m² :</span>
            <strong>{int2.format(item.prix_m2)}</strong>
          </li>
          <li>
            <span>Prix de vente :</span>
            <strong>{int2.format(item.valeur_fonciere)}</strong>
          </li>
        </ul>
      </AccordionItemPanel>
    </AccordionItem>
  ));
  // End Accordion datas

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <title>
            Brik | Accès Complet |{' '}
            {address?.replace(/\b[a-z]/g, function (letter) {
              return letter.toUpperCase();
            })}
          </title>
          <meta name="theme-color" content="#185490" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

          <meta name="Description" content="Consultez toutes les informations immobilières concernant cette adresse" />

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

          <div className="values-content">
            {address !== null && (
              <div className="searchbar-parent">
                <SearchbarValue />
              </div>
              
            )}

            {/* Results table */}

            <div className="fullaccess-results full-access-container">
              <h1 className="small-text">
              <strong> Toutes less transaction </strong> a Lille
              </h1>

              <button className="btn-filter"> Filter <img src={caretIcon} className="caretIcon"/> </button>

              <br/><br/>

              <div className="filter-main-row">

              

              <div class="fullaccess-sorting">
              
              <p>   <Select/> </p>

              <p>   <Select/> </p>
 
              <p> Date de vente du : </p>

              <p>   <DatePickerInput
                          onChange={(e) => handleChangeDateStart(e)}
                          value={filterParams.date_mutation_min}
                        /> </p>

              <p> au </p>

              <p>   <DatePickerInput
                          onChange={(e) => handleChangeDateStart(e)}
                          value={filterParams.date_mutation_min}
                        /> </p>
              
              </div>

              </div>

              <table className="table-transactions transactions-info-table">
                <thead>
                  <tr>
                    <th colSpan="1">Adresse</th>
                    <th colSpan="1"> Type de bien </th>
                    <th colSpan="1"> Surface </th>
                    <th colSpan="1">Date</th>
                    <th colSpan="1">Prix du m²</th>
                    <th colSpan="1">Prix de vente</th>
                  </tr>
                </thead>
                <tbody>{itemsTable}</tbody>
              </table>

              {/* Limited access: Create account to see more. Shows only if disconnected */}
              {fetchError && (
                <div className="restricted-to-members">
                  <h1>Accès limité</h1>
                  <hr />
                  <p>Pour voir plus de transactions, créer un compte, c'est gratuit !</p>
                  <Link href="/register" className="menu-register-btn">
                    <span className="glyph-icon flaticon-user" /> Créer un compte <strong>gratuit</strong>
                  </Link>
                </div>
              )}

              {/* Results accordion for mobile */}
              <Accordion allowZeroExpanded>{accordionItems}</Accordion>
            </div>

            {/* The div under will show if user is not logged in  */}
            {fetchError && (
              <div className="restricted-to-members">
                <h1>Accès réservé aux membres Brik</h1>
                <hr />
                <p>Vous devez vous connecter pour accéder à cette page</p>
                <Link href="/register" className="menu-register-btn">
                  <span className="glyph-icon flaticon-user" /> Créer un compte <strong>gratuit</strong>
                </Link>
              </div>
            )}

            {/* Header and filters  */}
             {/* {!fetchError && (
              <div className="fullaccess-filters">
                <h1>
                  Toutes les transactions
                  <span className="lite-text">
                    {' '}
                    {scope == 1 ? 'dans ce quartier de ' + address?.split(',')[1]?.trim() : ''}
                    {scope == 2 ? 'à ' + address?.split(',')[1]?.trim() : ''}
                    {scope == 3 ? 'dans le département' : ''}
                  </span>
                </h1>

                <p>
                  Accédez a l’ensemble de la base des transactions sous forme d’un tableau filtrable et classable
                  facilement.
                </p>
                <div className={'filters-container ' + (!showFilter ? 'dpnone-mobile-flex' : '')}>
                  <div className="filters-group">
                    <span className="filter-title">
                      Prix d'achat
                      <input
                        className="tgl tgl-light"
                        id="cb1"
                        type="checkbox"
                        checked={filterParams.priceFilterEnabled}
                        onChange={() => handleChangePriceEnabled()}
                      />
                      <label className="tgl-btn" htmlFor="cb1"></label>
                    </span>
                    <Range
                      disabled={!filterParams.priceFilterEnabled}
                      min={0}
                      max={5000000}
                      step={10000}
                      defaultValue={[0, 5000000]}
                      onChange={(e) => handleChangePriceValues(e)}
                    />
                    <p>
                      {filterParams.valeur_fonciere_min == 0
                        ? 'du minimum'
                        : 'de ' + int2.format(filterParams.valeur_fonciere_min)}{' '}
                      {filterParams.valeur_fonciere_max == 5000000
                        ? 'au maximum'
                        : 'à ' + int2.format(filterParams.valeur_fonciere_max)}
                    </p>
                  </div>
                  <div className="filters-group">
                    <span className="filter-title">
                      Surface
                      <input
                        className="tgl tgl-light"
                        id="cb2"
                        type="checkbox"
                        checked={filterParams.surfaceFilterEnabled}
                        onChange={() => handleChangeSurfaceEnabled()}
                      />
                      <label className="tgl-btn" htmlFor="cb2"></label>
                    </span>
                    <Range
                      disabled={!filterParams.surfaceFilterEnabled}
                      min={0}
                      max={1000}
                      step={10}
                      defaultValue={[0, 1000]}
                      onChange={(e) => handleChangeSurfaceValues(e)}
                    />
                    <p>
                      {filterParams.surface_totale_min == 0
                        ? 'du minimum'
                        : 'de ' + filterParams.surface_totale_min + 'm²'}{' '}
                      {filterParams.surface_totale_max == 1000
                        ? 'au maximum'
                        : 'à ' + filterParams.surface_totale_max + 'm²'}
                    </p>
                  </div>

                  <div className="filters-group datepicking">
                    <span className="filter-title">
                      Date de vente
                      <input
                        className="tgl tgl-light"
                        id="cb3"
                        type="checkbox"
                        checked={filterParams.soldDateEnabled}
                        onChange={() => handleChangeDateEnabled()}
                      />
                      <label className="tgl-btn" htmlFor="cb3"></label>
                    </span>

                    {filterParams.soldDateEnabled && (
                      <div className="filters-dates">
                        <DatePickerInput
                          label="Du"
                          onChange={(e) => handleChangeDateStart(e)}
                          value={filterParams.date_mutation_min}
                        />
                        <DatePickerInput
                          label="Au"
                          onChange={(e) => handleChangeDateEnd(e)}
                          value={filterParams.date_mutation_max}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <span
                  className={
                    'btn-blue ' + (!showFilter ? 'dpnone-mobile ' : '') + (isRefreshingData ? 'btn-loading-state' : '')
                  }
                  onClick={() => refreshTransactions(filterParams)}
                >
                  Valider les filtres
                </span>
                <span className="btn-blue fullaccess-show-filter" onClick={() => setShowFilter(!showFilter)}>
                  {!showFilter ? 'Voir les filtres' : 'Cacher les filtres'}
                </span>
              </div> 
            )} */}

            {!fetchError && (
              <div className="fullaccess-results">
                <h1 className="fullaccess-table-header">{data?.data.data.length} résultats</h1>
                <div className="fullaccess-sorting">
                  <p>Trier par : </p>

                  <div className="year-selector">
                    <span
                      onClick={() => handleSortingChange('valeur_fonciere')}
                      className={sortingValue == 'valeur_fonciere' ? 'year-active' : ''}
                    >
                      Prix de vente
                    </span>
                    <span
                      onClick={() => handleSortingChange('prix_m2')}
                      className={sortingValue == 'prix_m2' ? 'year-active' : ''}
                    >
                      Prix du m²
                    </span>
                    <span
                      onClick={() => handleSortingChange('date_mutation')}
                      className={sortingValue == 'date_mutation' ? 'year-active' : ''}
                    >
                      Date
                    </span>
                  </div>
                </div>

                <div className="fullaccess-sorting">
                  <p>Ordre : </p>

                  <div className="year-selector">
                    <span onClick={() => handleOrderChange('ASC')} className={orderValue == 'ASC' ? 'year-active' : ''}>
                      Croissant
                    </span>
                    <span
                      onClick={() => handleOrderChange('DESC')}
                      className={orderValue == 'DESC' ? 'year-active' : ''}
                    >
                      Décroissant
                    </span>
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th colSpan="1">Adresse</th>
                      <th colSpan="1">Date</th>
                      <th colSpan="1">Prix du m²</th>
                      <th colSpan="1">Prix de vente</th>
                      {/* <th colSpan="1">Plus value</th> */}
                    </tr>
                  </thead>
                  <tbody>{itemsTable}</tbody>
                </table>
                <Accordion allowZeroExpanded>{accordionItems}</Accordion>
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

export default FullAccess;
