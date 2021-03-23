import axios from 'axios';
import { ResponsiveCSS } from 'common/src/assets/css/responsive';
import { ResetCSS } from 'common/src/assets/css/style';
import m10 from 'common/src/assets/image/brik/values/10-50m2.png';
import m100 from 'common/src/assets/image/brik/values/100-200m2.png';
import m200 from 'common/src/assets/image/brik/values/200m2.png';
import m50 from 'common/src/assets/image/brik/values/50-100m2.png';
import Link from 'common/src/components/Link';
import SliderBox from 'common/src/components/Range-with-RC-SLIDE';
import TransactionPrixChart from 'common/src/components/TransactionPrixChart';
import { DrawerProvider } from 'common/src/contexts/DrawerContext';
import { useRequestUser } from 'common/src/hooks/useRequestUser';
import { theme } from 'common/src/theme/Brik';
import { ContentWrapper, GlobalStyle } from 'containers/Brik/brik.style';
import Footer from 'containers/Brik/Footer';
import Navbar from 'containers/Brik/Navbar';
import SearchbarValue from 'containers/Brik/SearchBar';
import SideMenu from 'containers/Brik/SideMenu';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import bellIcon from 'common/src/assets/image/brik/values/icons/bell.svg';

import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import TagManager from 'react-gtm-module';
import Progress from 'react-progressbar';
import { useDispatch, useSelector } from 'react-redux';
import Sticky from 'react-stickynode';
import ReactTooltip from 'react-tooltip';
import { actions } from 'store/actions/apiActions';
import { actions as actionsSearch } from 'store/actions/searchActions';
import { ThemeProvider } from 'styled-components';
import config from '../../../config';

if (process.browser && process.env.NODE_ENV !== 'development') {
  TagManager.initialize(config.tagManager);
}

var int2 = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  currencyDisplay: 'symbol',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
});

const baseUrl = process.env.NEXT_PUBLIC_DVF_ROOT_URL;
const listRequestType = 'list';
const transactionPeakRequestType = 'transactions';

const fetchTransactions = async (address, dispatch, postal_code, filters, scope) => {
  dispatch(actions.getTransactions());

  let params = {
    requestType: listRequestType,
    code_type_local: filters.join(','),
    perimeter: 'district',
    limit: 20
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

  const data = await axios.get(`${baseUrl}?${new URLSearchParams(params)}`);
  dispatch(actions.getTransactionsResponse(data));
};

// Fetch Evolution Transaction
// Fetch
const fetchTransactionEvolution = async (address, dispatch, postal_code, filters, scope) => {
  dispatch(actions.getTransactionEvolution());

  let params = {
    requestType: transactionPeakRequestType,
    code_type_local: filters.join(','),
    perimeter: 'district',
    limit: 20
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

  const dataEvolutionTransaction = await axios.get(`${baseUrl}?${new URLSearchParams(params)}`);
  dispatch(actions.getTransactionEvolutionResponse(dataEvolutionTransaction));
};

export default () => {
  const [sliderValue, setSliderValue] = useState(150);
  const [surfaceAverageValueCurrent, setsurfaceAverageValueCurrent] = useState(200000);
  const { fetchError } = useRequestUser();

  const [transacEvolution, setTransacEvolution] = useState(null);

  const {
    search: { address, postal_code, filters, scope },
    api: {
      transactionData: data,
      isFetchingTransactions: isFetchingTransactionsBool,
      dataTransactionEvolution: dataEvolutionTransaction,
      isFetchingTransactionEvolution: isFetchingTransactionEvolutionBool,
      needsRefresh
    }
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
    if (
      (!isFetchingTransactionsBool && !data && address) ||
      (!isFetchingTransactionsBool && data?.data.data.length > 20)
    ) {
      fetchTransactions(address, dispatch, postal_code, filters, scope);
    }

    if (!isFetchingTransactionEvolutionBool && !dataEvolutionTransaction && address) {
      fetchTransactionEvolution(address, dispatch, postal_code, filters, scope);
    }

    if (!needsRefresh && address) {
      fetchTransactions(address, dispatch, postal_code, filters, scope);
      fetchTransactionEvolution(address, dispatch, postal_code, filters, scope);
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
  }, [data, dataEvolutionTransaction, address, needsRefresh, dispatch]);

  // Get type
  function getLocalType(item) {
    let stringType = null;
    item.appartement > 0 ? (stringType = 'Appartement') : null;
    item.maison > 0 ? (stringType = 'Maison') : null;
    item.dependance > 0 ? (stringType = 'Dépendance') : null;
    item.local > 0 ? (stringType = 'Commerce / Bureau') : null;
    return stringType;
  }

  // Tableau datas
  const itemsTable = data?.data.data.map((item, key) => (
    <tr key={key}>
      <td className="result-adresse">
        <div className="circle-grey map-button"></div>
        {item.adresse}
        <span className="result-distance">({item.distance}m)</span>
        <span className="result-undertext-nm">
          {item.nombre_pieces_principales_total > 0 ? item.nombre_pieces_principales_total + ' pièces - ' : ''}
          {Math.round(item.surface_totale)}m2 - {getLocalType(item)}
        </span>
      </td>
      <td>

      </td>
      <td>
        
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

  // Percentage calculation area evolution
  let mutationsAreaEvolution = {
    m10: [0, 0], // Index 1 = Amount of transactions, Index 2 = average price
    m50: [0, 0],
    m100: [0, 0],
    m200: [0, 0]
  };
  let surfaceAverageValue = [];
  let dataPic = [];
  let picMonth = ['', 0];

  if (dataEvolutionTransaction) {
    let datas = dataEvolutionTransaction.data.data;
    mutationsAreaEvolution.m10 = [datas.by_surface.nb_m2_10_49, datas.by_surface.prix_m2_moyen_m2_10_49];
    mutationsAreaEvolution.m50 = [datas.by_surface.nb_m2_50_99, datas.by_surface.prix_m2_moyen_m2_50_99];
    mutationsAreaEvolution.m100 = [datas.by_surface.nb_m2_100_199, datas.by_surface.prix_m2_moyen_m2_100_199];
    mutationsAreaEvolution.m200 = [datas.by_surface.nb_m2_200, datas.by_surface.prix_m2_moyen_m2_200];

    // Surface average value mapping (for slider)
    surfaceAverageValue = [
      [mutationsAreaEvolution.m10[1], '10 à 49'],
      [mutationsAreaEvolution.m50[1], '50 à 99'],
      [mutationsAreaEvolution.m100[1], '100 à 199'],
      [mutationsAreaEvolution.m200[1], 'plus de 200']
    ];

    // Transaction peak
    let monthsName = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
    let monthsNameFull = [
      'Janvier',
      'Fevrier',
      'Mars',
      'Avril',
      'Mais',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre'
    ];
    for (let month of datas.by_month) {
      dataPic.push({
        label: monthsName[month.mois - 1],
        value: month.nb_mutations
      });
    }
    picMonth[0] = monthsNameFull[datas.month_peak.mois - 1]; // Storing month with the most sells and the percentage of global sales
    picMonth[1] = datas.month_peak.pourcent;

    // Evolutions
    if (transacEvolution == null) {
      setTransacEvolution({
        amount: [datas.last_12_months.montant_total, datas.last_12_months.pourcent_montant_total_12_previous_month],
        transaction: [datas.last_12_months.nb_mutations, datas.last_12_months.pourcent_nb_12_previous_month]
      });
    }
  }

  function getPercentArea(surface) {
    // Surface is a type corresponding to 0 = m50,1 = m100 etc
    switch (surface) {
      case 0:
        return dataEvolutionTransaction?.data.data.by_surface.pourcent_nb_m2_10_49.replace(',', '.');

      case 1:
        return dataEvolutionTransaction?.data.data.by_surface.pourcent_nb_m2_50_99.replace(',', '.');

      case 2:
        return dataEvolutionTransaction?.data.data.by_surface.pourcent_nb_m2_100_199.replace(',', '.');

      case 3:
        return dataEvolutionTransaction?.data.data.by_surface.pourcent_nb_m2_200.replace(',', '.');

      default:
        break;
    }
    if (!isNaN(percent)) {
      return percent;
    } else {
      return 0;
    }
  }

  function formatNumber(number) {
    // Nine Zeroes for Billions
    return Math.abs(Number(number)) >= 1.0e9
      ? Math.round(Math.abs(Number(number)) / 1.0e9) + 'Md €'
      : Math.abs(Number(number)) >= 1.0e6
      ? Math.round(Math.abs(Number(number)) / 1.0e6) + 'M €'
      : Math.abs(Number(number)) >= 1.0e3
      ? int2.format(Number(number))
      : Math.abs(Number(number));
  }

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <title>
            Brik | Transactions |{' '}
            {address?.replace(/\b[a-z]/g, function (letter) {
              return letter.toUpperCase();
            })}
          </title>
          <meta name="theme-color" content="#185490" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          <meta name="Description" content="Consultez les dernières transactions de cette adresse" />
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
            {/* Header and filters  */}
            <div className="transactions-filters">
              <h1>
                Transactions réalisées
                <span className="lite-text">
                  {' '}
                  {scope == 1 ? 'dans ce quartier de ' + address?.split(',')[1]?.trim() : ''}
                  {scope == 2 ? 'à ' + address?.split(',')[1]?.trim() : ''}
                  {scope == 3 ? 'dans le département' : ''}
                </span>
              </h1>

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

            {/* Results table */}

            <div className="fullaccess-results">
              <h1 className="small-text">
                Transactions <strong>les plus proches</strong>
              </h1>

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

            {/* Quantity */}
            <div className="values-container transactions-quantity text-center">
              <div>
                <p>
                  <strong>Nombre de transactions </strong>
                  <br/> 
                  des 12 derniers mois
                </p>
                <br/> 
                <strong className="transactions-p">Volume des transactions des 12 derniers mois </strong>  
                 <br/>
                <h1>{transacEvolution?.transaction[0]}</h1>
                <span> <br/><br/> {transacEvolution?.transaction[1]}% <br/> par rapport aux 12 mois précédents</span>
              </div>

              <div>
                <p>
                  <strong className="transactions-p">Volume des transactions des 12 derniers mois </strong>
                </p>
                <h1>{formatNumber(transacEvolution?.amount[0])}</h1>
                <span> <br/><br/> {transacEvolution?.amount[1]}% <br/> par rapport aux 12 mois précédents</span>
              </div>
            </div>

            {/* Transac surface */}
            <div className="text-center surface-main">
              <div className="invest-stats-container">
                <h1 className="invest-title">
                  <strong>Transactions par surface</strong> 
                  <br/>
                  (moyenne sur 5 ans)
                </h1>

                <ul className="square-progress">
                  <li>
                    <img src={m10}></img>
                    <span>10 - 50m²</span>
                    <Progress completed={getPercentArea(0)} />
                    <span className="percent-area-mobile">{getPercentArea(0)}%</span>
                  </li>
                  <li>
                    <img src={m50}></img>
                    <span>50 - 100m²</span>
                    <Progress completed={getPercentArea(1)} />
                    <span className="percent-area-mobile">{getPercentArea(1)}%</span>
                  </li>
                  <li>
                    <img src={m100}></img>
                    <span>100 - 200m²</span>
                    <Progress completed={getPercentArea(2)} />
                    <span className="percent-area-mobile">{getPercentArea(2)}%</span>
                  </li>
                  <li>
                    <img src={m200}></img>
                    <span>+200m²&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Progress completed={getPercentArea(3)} />
                    <span className="percent-area-mobile">{getPercentArea(3)}%</span>
                  </li>
                  {/* Todo : Fix that space thing */}
                </ul>
              </div>

              <div className="invest-stats-container invest-stats-right">
                <h1 className="invest-title">
                  <strong>Prix moyen par surface</strong> <br/> (moyenne sur 5 ans)
                </h1>
                <h1 className="text-center">Prix moyen par surface</h1>
                <h4 className="color-blue mgauto text-center">
                  {surfaceAverageValue[sliderValue / 50 - 1] &&
                  isNaN(surfaceAverageValue[sliderValue / 50 - 1][0]) == false
                    ? surfaceAverageValue[sliderValue / 50 - 1][0].toFixed(0).toLocaleString()
                    : 'N/A'}
                  €
                </h4>
                <SliderBox min={50} max={200} step={50} value={sliderValue} onChange={setSliderValue} />
                <div className="margin-generator"></div>

                <h1 className="text-center">
                  Pour <br/> {surfaceAverageValue[sliderValue / 50 - 1] && surfaceAverageValue[sliderValue / 50 - 1][1]}
                  m²
                </h1>
              </div>
            </div>

            {/* Graphique surface  */}
            <div className="transaction-peak">
              <div className="invest-surface-msquare">
                <p>
                  <strong>Pic de transaction</strong> (Moyenne sur 5 ans)
                </p>

                <div className="chart-tension">
                  <TransactionPrixChart data={dataPic} title={'Pic'} color="#185490" thickness={14} />
                </div>
                <div className="info-tension">
                <p className="info-title"> Synthese  </p>
                
                  <p>
                    Avec plus de {picMonth[1]}% des ventes effectuées,
                    <strong> le mois de {picMonth[0]}</strong> semble être le mois où les ventes sont le plus conclues
                    dans cette zone.
                  </p>
                </div>
              </div>
            </div>

            {/* dynamisme */}

            <div className="transaction-list-container">
             
            <h1> Dynamisme <strong> a Lille </strong></h1>      

            <div className="arrow_box">
               
               <h4> 01 </h4>

               <p> Volume des transactions des 12 derniers mois </p>

            </div>     
             <br/>
            <div className="arrow_box">
               
               <h4> 01 </h4>

               <p> Volume des transactions des 12 derniers mois </p>

            </div>  

            <br/>

             <div className="arrow_box">
               
               <h4> 01 </h4>

               <p> Volume des transactions des 12 derniers mois </p>

            </div>  

            <br/>

            <div class="gradient-box">
            <p class="info-title"> Synthese  </p>
            <p>Avec plus de % des ventes effectuées,<strong> le mois de Juillet</strong> 
            semble être le mois où les ventes sont le plus conclues dans cette zone.</p>
            </div>      

            </div>

          </div>

          <SideMenu slug={currentSlug} />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
