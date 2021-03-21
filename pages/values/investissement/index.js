import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/src/theme/Brik';
import { ResetCSS } from 'common/src/assets/css/style';
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

// Assets
import good from 'common/src/assets/image/brik/good.png';
import bad from 'common/src/assets/image/brik/bad.png';
import indicePlaceholder from 'common/src/assets/image/brik/values/indicePlaceholder.jpg';

import m10 from 'common/src/assets/image/brik/values/10-50m2.png';
import m50 from 'common/src/assets/image/brik/values/50-100m2.png';
import m100 from 'common/src/assets/image/brik/values/100-200m2.png';
import m200 from 'common/src/assets/image/brik/values/200m2.png';
import TransactionPrixChart from 'common/src/components/TransactionPrixChart';
import LineChart from 'common/src/components/LineChart';
import LineMultiChart from 'common/src/components/LineMultiChart';
import ReactTooltip from 'react-tooltip';

export default () => {
  const [filterEvolution, changeFilterEvolution] = useState(0);

  function handleChangeFilter(index) {
    changeFilterEvolution(index);
  }

  let dataIndice = [
    {
      label: 'A',
      value: 5 // La value vide
    },
    {
      label: 'B',
      value: 95 // Value verte
    }
  ];

  let dataEvolution = [
    {
      label: '2015',
      value: 2200
    },
    {
      label: '2016',
      value: 2600
    },
    {
      label: '2017',
      value: 2365
    },
    {
      label: '2018',
      value: 2985
    },
    {
      label: '2019',
      value: 3245
    },
    {
      label: '2020',
      value: 4000
    }
  ];

  let dataTransactions = [
    {
      label: '100K',
      value: 60
    },
    {
      label: '110K',
      value: 75
    },
    {
      label: '150K',
      value: 145
    },
    {
      label: '250K',
      value: 234
    },
    {
      label: '300K',
      value: 200
    },
    {
      label: '350K',
      value: 194
    },
    {
      label: '400K',
      value: 163
    },
    {
      label: '500K',
      value: 120
    },
    {
      label: '600K',
      value: 16
    },
    {
      label: '900+K',
      value: 8
    }
  ];

  let dataTension = [
    [
      // Deux dataset donc two-dimensional array
      {
        label: '2015',
        value: 4
      },
      {
        label: '2016',
        value: 6
      },
      {
        label: '2017',
        value: 5
      },
      {
        label: '2018',
        value: 10
      },
      {
        label: '2019',
        value: -2
      },
      {
        label: '2020',
        value: 15
      }
    ],
    [
      {
        label: '2015',
        value: 4
      },
      {
        label: '2016',
        value: 6
      },
      {
        label: '2017',
        value: 4
      },
      {
        label: '2018',
        value: 12
      },
      {
        label: '2019',
        value: -7
      },
      {
        label: '2020',
        value: 18
      }
    ]
  ];

  return (
    // <ThemeProvider theme={theme}>
    //   <Fragment>
    //     <Head>
    //       <title>Brik | Etudier</title>
    //       <meta name="theme-color" content="#185490" />
    // <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

    //       <meta name="Description" content="Valeurs immoblière Brik" />

    //       {/* Load google fonts */}
    //       <link
    //         href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100&display=swap"
    //         rel="stylesheet"
    //       />
    //       <script
    //         type="text/javascript"
    //         src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBnf0WJj1Xu2Bq9hUnxCvS3GmiHpSiHY4o&libraries=places"
    //       ></script>
    //     </Head>
    //     <ResetCSS />
    //     <GlobalStyle />
    //     <ContentWrapper>
    //       <Sticky top={0} innerZ={9999} className="sticky-nav-active">
    //         <DrawerProvider>
    //           <Navbar />
    //         </DrawerProvider>
    //       </Sticky>
    //       <SearchbarValue />

    //       <div className="values-content">
    //         {/* Indice de la zone  */}
    //         <div className="invest-specs">
    //           <h1>
    //             <strong>Investir</strong> à Lille ?
    //           </h1>

    //           <div className="invest-specs-indice">
    //             <h4>Indice Brik</h4>
    //             <IndiceBrik
    //               data={dataIndice}
    //               title={'Indices'}
    //               color="#70CAD1"
    //             />
    //             <p
    //               data-for="main"
    //               data-tip="Lorem ipsum dolor sit amet"
    //               data-iscapture="true"
    //             >
    //               Comment cet indice est-il calculé ?
    //             </p>
    //           </div>
    //           <ReactTooltip id="main" multiline={true} />

    //           <div className="invest-specs-list">
    //             <h1>
    //               Cette zone semble
    //               <strong> être propice à un investissement sûr.</strong>
    //             </h1>
    //             <ul>
    //               <li>
    //                 <img src={good}></img> <strong>Peu risqué : </strong>
    //                 Evolution de 30% sur les 5 dernières années
    //               </li>
    //               <li>
    //                 <img src={good}></img> Volume des ventes est
    //                 <strong> supérieur à 50%</strong> de la moyenne nationale
    //               </li>
    //               <li>
    //                 <img src={good}></img> <strong>Zone très dynamique </strong>
    //                 dans le cadre d’une plus-value à court terme
    //               </li>
    //               <li>
    //                 <img src={good}></img> <strong>Zone saine</strong> pour
    //                 l’investissement à long terme
    //               </li>
    //               <li>
    //                 <img src={bad}></img> <strong>Zone risquée</strong> pour
    //                 l’investissement à court terme
    //               </li>
    //             </ul>
    //           </div>
    //         </div>

    //         {/* Investissement par surface  */}

    //         <div className="invest-surface">
    //           <h1>
    //             Investissement par surface
    //             <span className="lite-text"> à Lille</span>
    //           </h1>

    //           <div className="invest-surface-msquare">
    //             <p>
    //               <strong>Evolution du prix du m²</strong> par surface
    //             </p>

    //             <ul className="evolution-list">
    //               <li
    //                 className={filterEvolution == 0 ? 'active-span-filter' : ''}
    //                 onClick={() => handleChangeFilter(0)}
    //               >
    //                 <img src={m10}></img>
    //                 <span>10 - 50m²</span>
    //               </li>
    //               <li
    //                 className={filterEvolution == 1 ? 'active-span-filter' : ''}
    //                 onClick={() => handleChangeFilter(1)}
    //               >
    //                 <img src={m50}></img>
    //                 <span>50 - 100m²</span>
    //               </li>
    //               <li
    //                 className={filterEvolution == 2 ? 'active-span-filter' : ''}
    //                 onClick={() => handleChangeFilter(2)}
    //               >
    //                 <img src={m100}></img>
    //                 <span>100 - 200m²</span>
    //               </li>
    //               <li
    //                 className={filterEvolution == 3 ? 'active-span-filter' : ''}
    //                 onClick={() => handleChangeFilter(3)}
    //               >
    //                 <img src={m200}></img>
    //                 <span>
    //                   +200m²&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //                 </span>
    //               </li>
    //               {/* Todo : Fix that space thing */}
    //             </ul>

    //             <div className="transac-chart">
    //               <LineChart
    //                 data={dataEvolution}
    //                 title={'Evolution du prix'}
    //                 step={1000}
    //                 ytick={true}
    //                 beginzero={true}
    //                 showgrid={true}
    //                 color="#185490"
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         {/* Nombre de transactions  */}

    //         <div className="invest-stats-row">
    //           <div className="invest-stats-container">
    //             <h1>
    //               <strong>Nombre de transactions par surface</strong> depuis 5
    //               ans
    //             </h1>

    //             <ul className="square-progress">
    //               <li>
    //                 <img src={m10}></img>
    //                 <span>10 - 50m²</span> <Progress completed={75} />
    //                 <span>134</span>
    //               </li>
    //               <li>
    //                 <img src={m50}></img>
    //                 <span>50 - 100m²</span> <Progress completed={45} />
    //                 <span>121</span>
    //               </li>
    //               <li>
    //                 <img src={m100}></img>
    //                 <span>100 - 200m²</span> <Progress completed={35} />
    //                 <span>80</span>
    //               </li>
    //               <li>
    //                 <img src={m200}></img>
    //                 <span>
    //                   +200m²&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //                 </span>
    //                 <Progress completed={15} />
    //                 <span>62</span>
    //               </li>
    //               {/* Todo : Fix that space thing */}
    //             </ul>
    //           </div>

    //           <div className="invest-stats-container">
    //             <h1>
    //               <strong>Nombre de transactions par prix</strong> depuis 5 ans
    //             </h1>

    //             <div className="transac-chart">
    //               <TransactionPrixChart
    //                 data={dataTransactions}
    //                 title={'Nombre de transactions'}
    //                 color="#185490"
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         {/* Indice de tension immoblière  */}

    //         <div className="invest-surface">
    //           <h1>
    //             Indice de tension immobilière
    //             <span className="lite-text"> à Lille</span>
    //           </h1>

    //           <div className="invest-surface-msquare">
    //             <p>
    //               <strong>Evolution du prix du m²</strong> par surface
    //             </p>
    //             <div className="chart-tension">
    //               <LineMultiChart
    //                 data={dataTension}
    //                 title={'Tension'}
    //                 color="#185490"
    //               />
    //             </div>

    //             <div className="info-tension">
    //               <p>
    //                 Une zone tendue est une zone où le prix du m2 augmente plus
    //                 que le nombre de transactions. Dans cette zone,
    //                 <strong>
    //                   en 2019, il y a eu de la tension par rapport à 2018, une
    //                   tension élevée annonce une raréfaction de l’offre.
    //                 </strong>
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* <SideMenu slug={currentSlug} /> */}

    //       <Footer />
    //     </ContentWrapper>
    //   </Fragment>
    // </ThemeProvider>
    <p>Coming soon</p>
  );
};
