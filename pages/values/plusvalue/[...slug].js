import axios from 'axios';
import { ResponsiveCSS } from 'common/src/assets/css/responsive';
import { ResetCSS } from 'common/src/assets/css/style';
import LineChart from 'common/src/components/LineChart';
import { DrawerProvider } from 'common/src/contexts/DrawerContext';
import { theme } from 'common/src/theme/Brik';
import { ContentWrapper, GlobalStyle } from 'containers/Brik/brik.style';
import Footer from 'containers/Brik/Footer';
import Navbar from 'containers/Brik/Navbar';
import SearchbarValue from 'containers/Brik/SearchBar';
import SideMenu from 'containers/Brik/SideMenu';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import TagManager from 'react-gtm-module';
import { useDispatch, useSelector } from 'react-redux';
import Sticky from 'react-stickynode';
import ReactTooltip from 'react-tooltip';
import { actions } from 'store/actions/apiActions';
import { actions as actionsSearch } from 'store/actions/searchActions';
import { ThemeProvider } from 'styled-components';
import { Grid, Typography, makeStyles, List, ListItem, ListItemText, Button, Hidden } from '@material-ui/core';
import config from '../../../config';
import bellIcon from 'common/src/assets/image/brik/values/icons/bell.svg';

if (process.browser && process.env.NODE_ENV !== 'development') {
  TagManager.initialize(config.tagManager);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 'auto',
    backgroundColor: '#F5F5F5',
    borderRadius: '5px',
    marginTop: '20px',
    padding: '15px'
  },
  listItem: {
    borderLeft: '1px solid #777F90',
    paddingLeft: '10px'
  },
  secondary: {
    color: 'blue'
  }
}));

var int2 = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  currencyDisplay: 'symbol',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
});

// Routes
const baseUrl = process.env.NEXT_PUBLIC_DVF_ROOT_URL;
const capitalGainRequestType = 'capitalGain';

// Get transactions list
const fetchPlusValue = async (address, dispatch, postal_code, filters, scope) => {
  dispatch(actions.getPlusValue());

  let params = {
    requestType: capitalGainRequestType,
    perimeter: 'district',
    limit: 10,
    cp: postal_code
  };
  switch (scope) {
    case 1:
      params = {
        ...params,
        address: address,
        distance: 500
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

  const plusValueData = await axios.get(`${baseUrl}?${new URLSearchParams(params)}`);
  dispatch(actions.getPlusValueResponse(plusValueData));
};

export default () => {
  const classes = useStyles();
  const {
    search: { address, postal_code, filters, scope },
    api: { plusValueData: dataPlusValue, isFetchingPlusValue: isFetchingPlusValueBool, needsRefresh }
  } = useSelector((state) => state);

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

    let slug = addr.split(', ').reverse();
    slug.splice(0, 1);
    slug.splice(1, 0, postalcode);

    return (
      '/' + slug.join('/').replace(/\s+/g, '+').toLowerCase() + '/' + filtersSlug.join('+') + '/' + scopes[scope - 1]
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
    if ((!isFetchingPlusValueBool && !dataPlusValue && address) || !needsRefresh) {
      fetchPlusValue(address, dispatch, postal_code, filters, scope);
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
  }, [address, dataPlusValue, needsRefresh, dispatch]);

  let dataEvolution = [];

  let graphHeadDatas = {
    percent: 0,
    amount: 0
  };

  if (dataPlusValue) {
    for (const year of dataPlusValue.data.data.gain_by_year) {
      dataEvolution.push({
        label: year.annee_mutation,
        value: year.plus_value
      });
    }
  }

  const itemsClose = dataPlusValue?.data.data.gain_nearby.map((item, key) => {
    return (
      <ListItem className={classes.root}>
        <Grid xs="2">
          <ListItemText primary="Ville" secondary={item.nom_commune} />
        </Grid>
        <Grid xs="2" className={classes.listItem}>
          <ListItemText primary="Prix d'achat moyen" secondary={int2.format(item.achat_moyen)} />
        </Grid>
        <Grid xs="3" className={classes.listItem}>
          <ListItemText primary="Prix de revente moyen" secondary={int2.format(item.vente_moyen)} />
        </Grid>
        <Grid xs="5" className={classes.listItem}>
          <Grid container direction="row" justify="space-between" alignItems="flex-start">
            <Grid item>
              <Grid direction="column" justify="flex-start" alignItems="flex-start">
                <ListItemText primary="Plus-Value" />
                <div className="plus-value-pourcent">{item.pourcent}&nbsp;%</div>
                <div className="plus-value-moyen">+&nbsp;{int2.format(item.plus_value_moyen)}</div>
              </Grid>
            </Grid>
            <Grid item alignItems="flex-end" alignContent="flex-end">
              <Button variant="contained" color="primary">
                Etudier cette zone
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
    );
  });

  const itemsTable = dataPlusValue?.data.data.list.map((item, key) => (
    <tr key={key}>
      <td className="result-adresse">
        <div className="circle-grey map-button"></div>
        {item.adresse}
        <span className="result-distance">({item.distance}m)</span>
        <span className="result-undertext-nm">
          {item.nombre_pieces_principales_total > 0 ? item.nombre_pieces_principales_total + ' pièces - ' : ''}
          {item.surface_totale_format}m2
        </span>
      </td>
      <td>

      </td>
      <td>
        
      </td>
      <td>
        {int2.format(item.valeur_fonciere)}
        <span className="result-undertext-nm">{item.date_mutation_mois_format}</span>
      </td>
      <td>
        {int2.format(item.valeur_fonciere_vente)}
        <span className="result-undertext-nm">{item.date_vente_format}</span>
      </td>
      <td className={item.plus_value < 0 ? 'color-red-right' : 'color-green-right'}>
        {item.plus_value_format + ' €'}
        <span className="result-undertext-nm">
          {item.valeur_fonciere > item.valeur_fonciere_vente ? '' : '+'}
          {Math.round(((item.valeur_fonciere_vente - item.valeur_fonciere) / item.valeur_fonciere) * 100)}%
        </span>
      </td>
    </tr>
  ));

  const accordionItems = dataPlusValue?.data.data.list.map((item, key) => (
    <AccordionItem key={key}>
      <AccordionItemHeading>
        <AccordionItemButton>
          {item.adresse} <br />{' '}
          <span className={'accordion-title-price ' + (item.plus_value < 0 ? 'mobile-only-red' : 'mobile-only-green')}>
            {item.plus_value_format + ' €'}
          </span>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <ul>
          <li>
            <span>Surface :</span>
            <strong>{item.surface_totale_format}m²</strong>
          </li>
          <li>
            <span>Date :</span>
            <strong>{item.date_vente_format}</strong>
          </li>
          <li>
            <span>Prix de d'achat :</span>
            <strong>{int2.format(item.valeur_fonciere)}</strong>
          </li>
          <li>
            <span>Prix de revente :</span>
            <strong>{int2.format(item.valeur_fonciere_vente)}</strong>
          </li>
          <li>
            <span>Plus value :</span>
            <strong className={item.plus_value < 0 ? 'color-red-right' : 'color-green-right'}>
              {item.plus_value_format + ' €'}
            </strong>
            <span className="result-undertext-nm">
              {item.valeur_fonciere > item.valeur_fonciere_vente ? '' : '+'}
              {Math.round(((item.valeur_fonciere_vente - item.valeur_fonciere) / item.valeur_fonciere) * 100)}%
            </span>
          </li>
        </ul>
      </AccordionItemPanel>
    </AccordionItem>
  ));

  const accordionNearbyItems = dataPlusValue?.data.data.gain_nearby.map((item, key) => (
    <AccordionItem key={key}>
      <AccordionItemHeading>
        <AccordionItemButton>{item.nom_commune}</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <ul>
          <li>
            <span>Plus value :</span>
            <strong>
              {item.plus_value > 0 ? '+' : '-'} {int2.format(item.plus_value)}
            </strong>
          </li>
          <li>
            <span>Evolution :</span>
            <strong>
              {item.pourcent > 0 ? '+' : '-'}
              {item.pourcent} %
            </strong>
          </li>
        </ul>
      </AccordionItemPanel>
    </AccordionItem>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <title>
            Brik | Plus Value |{' '}
            {address?.replace(/\b[a-z]/g, function (letter) {
              return letter.toUpperCase();
            })}
          </title>
          <meta name="theme-color" content="#185490" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          <meta name="Description" content="Consultez les dernières plus values de cette adresse" />
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

            <div className="transactions-filters plusvalue">
              <h1>
                Plus value
                <span className="lite-text">
                  {' '}
                  {scope == 1 ? 'dans ce quartier de ' + address?.split(',')[1]?.trim() : ''}
                  {scope == 2 ? 'à ' + address?.split(',')[1]?.trim() : ''}
                  {scope == 3 ? 'dans le département' : ''}
                </span>
              </h1>

              <p className="plusvalue-description">
                Le calcul de la plus value vous est proposé lorsque le propriétaire a acheté et revendu l’immeuble lors
                des 5 dernière années
              </p>

              <span
                className="btn-blue cursor-disable"
                data-for="main"
                data-tip="Bientôt disponible !"
                data-iscapture="true"
              >
               <img className="bellIcon" src={bellIcon} />
                Créer une alerte
              </span>
            </div>
            <ReactTooltip id="main" multiline={true} />

            <div className="fullaccess-results">
              
              <table className="table-transactions">
                <thead>
                  <tr>
                    <th colSpan="1">Adresse</th>
                    <th colSpan="1"> Surface </th>
                    <th colSpan="1"> Date </th>
                    <th colSpan="1">Date d'achat</th>
                    <th colSpan="1">Prix de revente</th>
                    <th colSpan="1">Plus-value</th>
                  </tr>
                </thead>
                <tbody>{itemsTable}</tbody>
              </table>

              <Accordion allowZeroExpanded>{accordionItems}</Accordion>
            </div>

            <div className="plusvalue-row">
              <div className="plusvalue-container stats-evolution">
                <p>
                  <strong>(BETA) Evolution de la plus-value moyenne</strong> basée sur les transactions depuis 2014 :
                </p>
                <h1 className="color-green">{dataPlusValue?.data.data.plus_value_pourcent}%</h1>
                <h2 className="color-blue">
                  ({dataPlusValue?.data.data.plus_value_moyenne > 0 ? '+' : ''}
                  {int2.format(dataPlusValue?.data.data.plus_value_moyenne)})
                </h2>

                <div className="plusvalue-evolution">
                  <LineChart data={dataEvolution} title={'Evolution du prix'} color="#185490" step={100000} />
                </div>
              </div>

              <div className="plusvalue-container stats-evolution stats-blur">
                <p className="blur">
                  <strong>Evolution de la plus-value moyenne</strong> basée sur les transactions des 5 dernières années
                  :
                </p>
                <h1 className="color-green blur">+14%</h1>
                <h2 className="color-blue blur">(+130 000€)</h2>

                <div className="unlock-premium">
                  <h1 className="soon-plus-value">
                    Bientôt disponible : la plus value <br/> projetée sur
                    <strong> 5 ans</strong>, passez au
                    <strong> Premium ! </strong>
                  </h1>
                  <button class="btn-blue-package"> Passer au premium </button>
                </div>
              </div>
            </div>

            <div className="fullaccess-results">
              <h1 className="small-text">
                <strong>Plus value comparative aux villes limitrophes sur 5ans</strong>
              </h1>
              <Grid lg={4}>
                <Typography variant="body2" color="textSecondary">
                  Découvrez les plus-values moyenne basée sur les ventes des derniers 90 jours, 12 derniers mois ou des
                  5 dernières années
                </Typography>
              </Grid>
              <Hidden only={['xs', 'md', 'sm']}>
                <Grid xs="12">
                  <List>{itemsClose}</List>
                </Grid>
              </Hidden>

              <div>
                
                <table className="plus-value-table">
                    
                    

                </table>

              </div>

              <Accordion allowZeroExpanded>{accordionNearbyItems}</Accordion>
            </div>
          </div>
          <SideMenu slug={currentSlug} />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
