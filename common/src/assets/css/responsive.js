import { createGlobalStyle } from 'styled-components';
import './flaticon.css';
import './webfonts.css';

export const ResponsiveCSS = createGlobalStyle`
@media only screen and (max-width: 1280px) {

    /* Header */

    header{
      padding: 4px 0 0px !important;
      background-color:#185490 !important;
    }

    header > div {
      padding:0 5px !important;
    }

    header .menu-items {
      display:flex !important;
      width: 100%;
    }  

    header img {
      width: 46px;
      margin-top: 2px;
    }

    header nav {
    }

    header .mobile-menu{
      background-color: #185490 !important;
      top: 50px !important;
      height: calc(100vh - 50px) !important;
      left:0;
    }

    .mobile-menu-header {
      position: relative;
      width: 100vw;
      top: -50px;
      left: -5px;
      margin: 0;
      height: 50vh;
      background: #3a90f4;
    }

    .mobile-menu-header .login-link {
      font-size:30px;
      margin-top:30px;
      font-weight:500
    }

    header button.menubar {
      position: relative;
      z-index: 99999;
      right: -30px;
    }

    .mobile-menu-header ul {
      margin: 0 auto;
      margin-top: 80px;
      width: 80%;
      text-align: center;
    }

    .mobile-menu .container ul li a {
      text-align:center;
      font-size:30px;
      font-weight:500;
      opacity: .5;
      margin-bottom:20px;
    }

    .main-logo{
      position: fixed;
      top: 15px;
      left: 7px;
    }

    .menu-items li{
      margin: 0 5vw !important;
    }

    /* Home page */

    #home {
      top:0px;
      background-size: cover;
      background-repeat: no-repeat;
    }

    #home > div {
      margin:0 auto;
      padding-left:10px;
      padding-right:10px;
    }

    #home div div  {
      max-width:100%;
      width:100%;
    }

    #home div div div {
      width:100%;
    }

    #home div div div h2 {
      width:100%;
    }

    #home > div > div > div > div {
      height:250px;
    }

    .home-header-div {
      height: auto !important;
    }

    .home-header-div h1 {
      font-size:1.7rem;
    }

    .home-header-div {
      height: auto !important;
    }

    .home-header-div h1 {
      font-size:1.7rem;
    }

    #home div div div h2 h1 {
      width:100%;
      font-size: 29px;
    }

    #home div div div h2 h1 span {
      font-weight:500;
    }

    #home .banner-caption {
      font-size: 1.1em;
      width: 90%;
      margin: 0 auto;
      line-height: 28px;
      font-weight: 300;
    }

    #home .rgpd-title{
      width:90%;
      margin:20px auto;
    }

    .google-places-autocomplete__suggestions-container{
      width:90% !important
    }

    .sponsoredBy{
      text-align: center;
      margin-top: 15px !important;
    }

    .outil-description-container{
      position: relative;
      padding: 0;
      top: -60px;
      min-height: 640px;
      background: #212A3C;
      color: #fff;
    }

    .outil-description-container .tools-des {
      width:100%;
    }

    .outil-description-container .tools-des h1 {
      width: 90%;
      font-size: 29px;
      line-height: 35px;
      margin-bottom:25px;
    }

    .outil-description-container .tools-des p {
      width: 90%;
      font-size: 17px;
      line-height: 20px;
    }

    .outil-description-container .tools-img{
      display: block;
      padding-top: 35px;
      margin: 0 auto;
      width: 65%;
    }

    #service > div{
      padding:0;
    }

    #service > div > div {
      width:90%;
    }

    #service .thumbnail{
      width: auto;
      display: inline-block;
      vertical-align: middle;
    }

    #service .content{
      width: 61%;
      display: inline-block;
      vertical-align: middle;
      margin-left: 15px;
    }

    .lets-start-container{
      padding:10px 0;
      min-height: 410px;
      margin-bottom:-60px;
    }

    .lets-start-content{
      width:90%;
    }

    .lets-start-content p {
      font-size: 25px;
      line-height: 37px;
    }

    .landing-search{
      position: relative !important;
      top: 25px !important;
      left: 0px !important;
    }

    .mobile-only-margin-top{
      margin-top: 42px !important;
    }

    footer {
      height: auto !important;
    }

    footer p {
      margin:0;
      width:100%;
      margin-top:0px !important;
    }

    /* Login */

    .login-content{
      top:5vh;
      margin:0;
      width:100%;
    }

    .login-content-left h1 {
      margin-bottom:20px !important;
    }

    .login-content-left, .login-form, .login-form form {
      width:100%;
    }

    .login-width {
      width: 90% !important;
    }

    .password-show-btn{
      display:none;
    }

    .has-relative-child{
      margin-bottom:15px;
    }

    .login-form .btn-blue{
      width:90%;
    }

    .login-form .sm-text {
      margin: 0 auto;
      margin-top: 15px;
      color: #fff;
      font-size: 12px;
      width: 85%;
      display: block;
      text-align: left;
    }

    .login-header .back-button{
      color: #fff;
      -webkit-text-decoration: none;
      text-decoration: none;
      position: relative;
      top: 10px;
      left: 10px;
    }

    .login-content-right{
      width:100%;
      margin-top:30px;
    }

    .login-content-right h1{
      margin-bottom:20px;
    }

    .login-content-right h1 br{
      display:none;
    }



    /* Register */

    .register-form {
      top : 50px !important;
      left : 20px !important;
      width: 90% !important;
      margin-bottom: 50px !important;
    }

    .register-form form button{
      width: 100%;
    }

    .register-form form{
      width: 100%;
    }

    .register-form form .form-field, .register-form .form-field input{
      width:100%;
    }

    .register-form a{
      margin-bottom:46px;
    }

    /* Sidemenu */
    .values-sidebar{
      position: fixed;
      width: 101vw;
      height: 10vh;
      background: #1a202c;
      top: initial;
      left: -2px;
      bottom: 0;
      right: 0;
      max-height:60px;
      z-index: 999999;
    }

    .menu-active{
      border-left:none;
      border-bottom:none;
      font-weight:400;
      position:relative;
      top:1px;
    }

    .values-sidebar ul{
      margin-top:0;
    }
    

    .values-sidebar ul li {
      width: 20vw;
      display: inline-block;
      padding-right: 0;
      padding-left: 0;
      height: 10vh;
      text-align: center;
      vertical-align: text-bottom;
      font-size: 9px;
    }

    .sidemenu-icon {
      display: block;
      margin: 0 auto;
      width: 20px;
      height: 20px;
      margin-bottom:10px;
    }

    /* Evolution */

    .stats-evolution h1{
      margin-bottom: 0;
    }
    .stats-evolution h2{
      margin-bottom: 150px;
    }

    .values-content{
      padding-left:0px;
      margin-bottom:0px;
      padding-bottom:10px;
    }

   .invest-surface .unlock-premium h1{
     margin-top:5px;
   }

   .invest-surface.mtchart {
     padding-top: 0px;
   }

   .login-page-header-btns{
      position: absolute !important;
      top: 19px !important;
      right: 24px !important;
      display: block !important;
    }
     
   .invest-surface.mtchart > div > div > canvas {
     display:none !important;
   }

    .invest-stats-row.margin-clearfix{
      margin-top:0px !important;
    }


    .invest-surface{
      padding:48px 10px;
    }

    .invest-surface > h1{
      font-size:28px;
    }


    .invest-surface-msquare{
      padding: 9px;
      border-radius: 10px;
      max-height: none;
    }
    .evolution-msquare-right h1{
      margin:10px;
    }
    .invest-surface-msquare .transac-chart{
      width:100%;
    }
    .evolution-msquare-right{
      vertical-align: top;
      max-width: 100%;
      width: 100%;
      height: 170px;
      display: inline-block;
    }

    .invest-stats-row{
      padding: 10px;
    }
    .invest-stats-container{
      width:100%;
    }

    .chart-tension, .info-tension{
      width:100%;
      padding: 0;
      margin: 0;
    }

    .invest-surface .unlock-premium{
      position: relative;
      top: -240px;
      margin-bottom: -240px;
      width: 100%;
      left: 0;
    }

    /* Transactions */

    .transactions-filters{
      width: 95%;
      margin: 48px auto;
    }

    .transactions-filters h1{
      width:100%;
    }

    .transactions-filters .btn-blue{
      width:100%;
      float:none;
    }
     
    .table-transactions {
      display:none;
    }

    .accordion__button:before{
      padding: 6px;
      float: right;
      position: relative;
      top: 11px;
    }

    .accordion-title-price{
      position: relative;
      font-size: 16px;
      font-weight: 400;
      left: 25px;
    }

    .accordion__panel, .accordion__button:hover{
      background:#f5f5f5;
    }

    .accordion__button:hover{
      border-radius: 10px 10px 0px 0px;
    }

    .accordion__panel {
      border-radius: 0px 0px 10px 10px;
      padding:10px;
    }

    .accordion__panel ul li{
      margin-top: 10px;
    }
    .accordion__panel ul li span{
      display:inline-block;
      width:50%;
      color:#9b9b9b;
    }
    .accordion__panel ul li strong{
      color: #185490;
    }

    .accordion__button{
      color: #185490;
      border-radius: 10px 10px 10px 10px;
      font-weight:500;
    }
    .accordion__item + .accordion__item{
      border:none;
    }

    .fullaccess-results{
      width: 95%;
      border-radius: 5px;
      padding: 10px;
    }

    .accordion{
      display:block;
      border:none;
    }

    .accordion__item{
      margin-bottom: 10px;
    }

    .values-container {
      padding: 10px;
      width: 95%;
    }

    .transactions-quantity div{
      display:block;
      width:100%;
    }

    .transactions-quantity div h1, .transactions-quantity div span{
      width:100%;
      margin-bottom:5px;
    }
    .transactions-quantity div h1{
      color: #b2dd62;
    }

    .transactions-quantity div span{
      left:0;
      color: #777F90;
      font-weight: 400;
    }

    
    .transactions-quantity div p{
      font-size:15px;
      color:#777F90;
      font-weight: bold;
    }

    .progressbar-container{
      width: 35% !important;
    }
    .square-progress li span{
      text-align:left;
      min-width: 80px;
    }
    .square-progress li img{
      display:none;
    }
    .percent-area-mobile{
      min-width:50px;
    }



    /* Plus value */

    .color-green-right{
      color: #B2DD62 !important;
    }

    .plusvalue-description{
      width:100%;
    }

    .plusvalue .btn-blue{
      top:0;
    }

    .plusvalue-row{
      width: 95%;
      margin : 20px auto;
      display : block;
    }

    .plusvalue-container{
      width:100%;
    }

    .plusvalue-container.stats-blur{
      margin: 20px auto;
      background: #bababa;
    }

    .stats-blur .unlock-premium{
      width: 100%;
      top: -230px;
      margin-bottom: -230px;
    }

    .fullaccess-results .small-text{
      margin-bottom: 15px;
    }

    .fullaccess-results p{
      color:#777F90;
    }

    /* Carte */

    .map-container{
      padding-left: 0px;
    }

    .map-sell-details {
      position: fixed !important;
      left: 0 !important;
      right: 0 !important;
      top: 0 !important;
      bottom: 0 !important;
      background: #fff !important;
      padding: 5px 20px !important;
      width: auto !important;
      z-index: 9999 !important;
    }

    .map-sell-details h1{
      width:100%;
      text-align:center;
      font-size:22px;
      font-weight:bold;
    }

    .map-sell-details ul li{
      font-weight:500;
    }

    .map-sell-details img{
      display:none;
    }

    .map-sell-details .glyph-icon{
      display:block;
      position: absolute;
      top: 0;
      right: 0;
      padding: 15px;
      background: #D3DFEA;
      color: #1A202C;
      font-weight: bold;
      margin-right: 0px;
    }

    .map-sell-details .glyph-icon:before{
      transform: rotate(45deg);
      position: inherit;
      padding: 10px;
      right: -5px;
      top: -5px;
      font-weight: bold;
      color: #255d96;
    }

    .map-settings{
      top: inherit !important;
      bottom: 200px !important;
      box-shadow: 0px 3px 6px #00000029 !important;
      width: 100% !important;
      right: 0px !important;
      display:none;
    }

    .map-price-range {
      top: inherit !important;
      bottom: 110px !important;
      box-shadow: 0px 3px 6px #00000029 !important;
      width: 100% !important;
      right: 0px !important;
      padding: 0px 30px !important;
      display:none;
    }









    /* Accès complet */

    .restricted-to-members{
      margin-top:100px;
      width:80%;
    }

    .fullaccess-filters{
      width: 95%;
      padding: 40px 10px 10px 10px;
      margin: 0 auto;
    }

    .fullaccess-filters h1{
      fwidth:95%;
      margin: 0 auto;
    }

    .fullaccess-results table{
      display:none;
    }

    .dpnone-mobile, .dpnone-mobile-flex {
      display:none;
    }

    .filters-container{
      background: #fff;
      border-radius: 15px;
      padding: 0 10px;
    }

    .filters-container .filters-group{
      margin-right:auto;
    }

    .fullaccess-show-filter{
      display: block !important;
      margin: 20px auto !important;
      text-align: center;
      background: #909090;
    }

    .react-datepicker-wrapper{
      width: 30%;
    }

    .datepicking .filters-dates .react-datepicker-wrapper div input{
      min-width: 80px;
    }

    .fullaccess-filters .btn-blue {
      
    }

    /* Searchbar */ 

    .searchbar-header .filters{
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translate(-50%, 20px);
    }

    .search-page-container img {
      position: relative;
      width: 25px;
      top: 60px;
      right: 15px;
      float: right;
      margin-top: -40px;
    }

    .mobile-only-nowrap {
      white-space: nowrap;
    }

    .filter-area{
      position: absolute;
      background: #fff;
      padding: 11px;
      border-radius: 5px;
      box-shadow: 0px 3px 6px #00000012;
      width: 100%;
      z-index: 9999;
    }
    .filter-area .search-cancel {
      display: block;
  
      top: -30px;
      right: -10px;
      position: absolute;
      margin: 0;
      padding: 0;
      transform: rotate(45deg);
      float: unset;
    }

    .search-checkbox{
      display: block;
      margin: 0 auto;
      width: 80%;
      margin-top: 30px;
    }

    .search-checkbox span{
      width: 100%;
      text-align: center;
    }

    .filter-area .filter-btn{
      float: none;
      width: 90%;
      display: block;
      margin: 0 auto;
      text-align: center;
      padding: 12px 20px;
      font-weight: 500;
      font-size: 14px;
    }

    /* Pricing */

    .pricing-content{
      padding-bottom:30px;
    }

    .pricing-plan-container{
      display: block;
      height: auto;
      margin: 0 auto;
      background: #fff;
      border-radius: 10px;
      max-width: 300px;
      width: 90%;
      margin-right: auto;
    }

    .pricing-plan-container:last-child{
      padding-bottom: 10px;
    }

    

    /* Specific color class */

    .color-red-right{
      color: #dd6262 !important;
    }

    .mobile-only-green{
      color:#B2DD62;
    }

    .mobile-only-red{
      color:#dd6262;
    }

    /* Places suggestion */

    .places-suggestions-container{
      height: auto;
    }

    .places-suggestion-item{
      display:block;
      margin-top:10px;
    }

    .places-suggestion-item h3{
      padding:10px;
    }


  }

  @media only screen and (max-width: 320px) {
    .menu-items li{
      margin: 0 8px !important;
    }

    .search-page-container img{
      display:none;
    }
  }


  /* Ipad */
  @media only screen and (min-width: 768px) and (max-width: 1280px) {
    .home-header-div h1{
      font-size:3em;
    }
    .login-content{
      margin:0 auto;
    }

    #home > div > div > div > div{
      height: 200px;
    }
    .places-suggestion-item{
      display: block;
      margin: 0 auto;
      margin-top: 10px;
      max-width: 50vw;
    }

    header img{
      position: relative;
      top:-2px;
    }
  }

  /* iPad PRO */
  @media only screen and (min-width: 900px) and (max-width: 1280px) {
    .pricing-plan-container{
      display:inline-block;
      margin-right:15px;
    }

    #home > div > div > div > div{
      height: 200px;
    }
  }
  
  
  
  `;
