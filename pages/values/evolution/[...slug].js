import axios from 'axios';
import { ResponsiveCSS } from 'common/src/assets/css/responsive';
import { ResetCSS } from 'common/src/assets/css/style';
import LineChart from 'common/src/components/LineChart';
import LineMultiChart from 'common/src/components/LineMultiChart';
// Assets
import TransactionPrixChart from 'common/src/components/TransactionPrixChart';
import TransactionPrixChartCurrency from 'common/src/components/TransactionPrixChartCurrency';
import { DrawerProvider } from 'common/src/contexts/DrawerContext';
import { theme } from 'common/src/theme/Brik';
import { ContentWrapper, GlobalStyle } from 'containers/Brik/brik.style';
import Footer from 'containers/Brik/Footer';
import Navbar from 'containers/Brik/Navbar';
import PlacesSuggestions from 'containers/Brik/PlacesSuggestions';
import SearchbarValue from 'containers/Brik/SearchBar';
import SideMenu from 'containers/Brik/SideMenu';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
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

// Routes
const baseUrl = process.env.NEXT_PUBLIC_DVF_ROOT_URL;
const requestType = 'evolution';

const fetchAreaEvolution = async (address, dispatch, postal_code, filters, scope) => {
  dispatch(actions.getAreaEvolution());
  let params = {
    requestType,
    code_type_local: filters.join(','),
    perimeter: 'district'
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

  const dataAreaEvolution = await axios.get(`${baseUrl}?${new URLSearchParams(params)}`);
  dispatch(actions.getAreaEvolutionResponse(dataAreaEvolution));
};

const Evolution = () => {
  const [diffSelectedYear, setDiffSelectedYear] = useState('n-5'); // Init diff compare to last year
  const router = useRouter();
  const [currentSlug, setCurrentSlug] = useState(router.query.slug);

  const {
    search: { address, postal_code, filters, scope },
    api: { areaEvolutionData: dataAreaEvolution, isFetchingAreaEvolution: isFetchingAreaEvolutionBool, needsRefresh }
  } = useSelector((state) => state);

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

  const dispatch = useDispatch();

  useEffect(() => {
    if ((!isFetchingAreaEvolutionBool && !dataAreaEvolution && address) || !needsRefresh) {
      fetchAreaEvolution(address, dispatch, postal_code, filters, scope);
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
  }, [dataAreaEvolution, address, needsRefresh, dispatch]);

  // Check if address set otherwise fetch from URl otherwise route index
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

  // Chart values & formating
  let dataEvolution = [];
  let dataTransactions = [];
  let dataVolume = [];
  let dataTension = [[], []];

  if (dataAreaEvolution) {
    for (let currYear of dataAreaEvolution.data.data.by_year) {
      dataEvolution.push({
        label: currYear.annee_mutation,
        value: currYear.prix_moyen_m2
      });
      dataTransactions.push({
        label: currYear.annee_mutation,
        value: currYear.nb_mutations
      });
      dataVolume.push({
        label: currYear.annee_mutation,
        value: currYear.montant_total
      });
      dataTension[0].push({
        label: currYear.annee_mutation,
        value: currYear.prix_moyen_m2
      });
      dataTension[1].push({
        label: currYear.annee_mutation,
        value: currYear.nb_mutations
      });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <title>
            Brik | Evolution |{' '}
            {address?.replace(/\b[a-z]/g, function (letter) {
              return letter.toUpperCase();
            })}
          </title>
          <meta name="theme-color" content="#185490" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

          <meta
            name="Description"
            content="Consultez l'évolution du m², des transactions et de la tension immobilière de cette adresse"
          />

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
            {/* Investissement par surface  */}
            {address !== null && (
              <div className="searchbar-parent">
                <SearchbarValue />
              </div>
            )}

            <div className="invest-surface">
              <h1>
                Prix du m2
                {address !== null && (
                  <span className="lite-text">
                    {' '}
                    {scope == 1 ? 'dans ce quartier de ' + address?.split(',')[1]?.trim() : ''}
                    {scope == 2 ? 'à ' + address?.split(',')[1]?.trim() : ''}
                    {scope == 3 ? 'dans le département' : ''}
                  </span>
                )}
              </h1>

              <div className="invest-surface-msquare">
                <p>
                  <strong>Evolution du prix du m²</strong> depuis 2014 :
                </p>

                <div className="transac-chart">
                  <LineChart
                    data={dataEvolution}
                    title={'Evolution du prix'}
                    step={1000}
                    ytick={true}
                    beginzero={true}
                    showgrid={true}
                    color="#185490"
                  />
                </div>

                <div className="evolution-msquare-right">
                  <div className="year-selector">
                    <span
                      onClick={() => setDiffSelectedYear('n-1')}
                      className={diffSelectedYear == 'n-1' ? 'year-active' : ''}
                    >
                      1 an
                    </span>
                    <span
                      onClick={() => setDiffSelectedYear('n-3')}
                      className={diffSelectedYear == 'n-3' ? 'year-active' : ''}
                    >
                      3 ans
                    </span>
                    <span
                      onClick={() => setDiffSelectedYear('n-5')}
                      className={diffSelectedYear == 'n-5' ? 'year-active' : ''}
                    >
                      5 ans
                    </span>
                  </div>
                  <h1 className="text-center">{dataAreaEvolution?.data.data.progression_prix_m2[diffSelectedYear]}%</h1>
                  <p className="text-center">
                    de progression du <strong>prix du m²</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="invest-surface mtchart">
              <div className="invest-surface-msquare">
                <div className="transac-chart blur">
                  <LineChart
                    data={dataEvolution}
                    title={'Evolution du prix'}
                    step={1000}
                    ytick={true}
                    beginzero={true}
                    showgrid={true}
                    color="#185490"
                  />
                </div>

                <div className="evolution-msquare-right blur">
                  <div className="year-selector">
                    <span>1 an</span>
                    <span>3 ans</span>
                    <span className="year-active">5 ans</span>
                  </div>

                  <h1 className="text-center">5%</h1>
                  <p className="text-center">
                    de progression du <strong>prix du m²</strong> au cours sur 5 ans.
                  </p>
                </div>
              </div>

              <div className="unlock-premium">
                <h1>
                  Bientôt la plus value projetée sur
                  <strong> 5 ans</strong>,
                  <br/>
                  passez au <strong> Premium ! </strong>
                  {/* , passez au <strong>Premium</strong> ! */}
                </h1>

                <button className="btn-blue-package"> Passer au premium </button>
                
                {/* <span className="btn-blue">
                  Passer en <strong>Premium</strong>
                </span> */}
              </div>
            </div>

            {/* Nombre de transactions  */}

            <h1 className="invest-title">
              Évolution des transactions
              {address !== null && (
                <span className="lite-text">
                  {' '}
                  {scope == 1 ? 'dans ce quartier de ' + address?.split(',')[1]?.trim() : ''}
                  {scope == 2 ? 'à ' + address?.split(',')[1]?.trim() : ''}
                  {scope == 3 ? 'dans le département' : ''}
                </span>
              )}
            </h1>
            <div className="invest-row">
              <div className="invest-container">
                <h1>
                  <strong>Nombre de transactions </strong> depuis 2014
                </h1>

                <div className="transac-chart">
                  <TransactionPrixChart
                    data={dataTransactions}
                    title={'Nombre de transactions'}
                    color="#185490"
                    step={1000}
                  />
                </div>
              </div>

              <div className="invest-container">
                <h1>
                  <strong>Volume en € de transactions</strong> depuis 2014
                </h1>

                <div className="transac-chart">
                  <TransactionPrixChartCurrency data={dataVolume} title={'Volume en €'} color="#185490" />
                </div>
              </div>
            </div>

            {/* Indice de tension immoblière  */}

            <div className="invest-surface">
              <h1>
                Indice de tension immobilière
                {address !== null && (
                  <span className="lite-text">
                    {' '}
                    {scope == 1 ? 'dans ce quartier de ' + address?.split(',')[1]?.trim() : ''}
                    {scope == 2 ? 'à ' + address?.split(',')[1]?.trim() : ''}
                    {scope == 3 ? 'dans le département' : ''}
                  </span>
                )}
              </h1>

              <div className="invest-surface-msquare">
                <p>
                  <strong>Evolution de la tension</strong>
                </p>
                <div className="chart-tension">
                  {dataTension[0].length !== 0 && needsRefresh && (
                    <LineMultiChart data={dataTension} title={'Tension'} color="#185490" />
                  )}
                </div>

                <div className="info-tension">
                  
                  <p className="info-title">  C'est, quoi <strong> une zone tendue ? </strong> </p>
                  <p>
                  
                    Une zone tendue est une zone où le prix du m2 augmente plus que le nombre de transactions. 
                    <br/><br/>
                    Dans cette zone, <strong>
                      en 2019, il y a eu de la tension par rapport à 2018, 
                      <br/><br/> une tension élevée annonce une raréfaction de l’offre.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            {/* <PlacesSuggestions /> */}
          </div>

          <SideMenu slug={currentSlug} />

          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export default Evolution;
