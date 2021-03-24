import { createGlobalStyle } from 'styled-components';
import './flaticon.css';
import './webfonts.css';

import bgRegister from 'common/src/assets/image/brik/register/bg.png';
import illustration from 'common/src/assets/image/brik/bannerbg.png';

export const ResetCSS = createGlobalStyle`
  ::selection {
    background: #185490;
    color: #ffffff;
  }

  html {
    box-sizing: border-box;
    -ms-overflow-style: scrollbar;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *:focus {
    outline: none;
  }

  html,
  html a,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  p,
  li,
  dl,
  th,
  dt,
  input,
  textarea,
  span,
  div {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    -webkit-tap-highlight-color: transparent;
    background: #1A202C;
  }

  ul {
    margin: 0;
    padding: 0;
  }



  li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  .reuseModalHolder {
    padding: 0 !important;
    &.demo_switcher_modal {
      border: 0 !important;
      background-color: rgba(16, 30, 77, 0.9) !important;
      .innerRndComponent {
        border-radius: 8px !important;
      }
    }
  }

  button.modalCloseBtn {
    position: fixed !important;
    z-index: 999991 !important;
    background-color: transparent !important;
    top: 10px !important;
    right: 10px !important;
    min-width: 34px !important;
    min-height: 34px !important;
    padding: 0 !important;
    span.btn-icon {
      font-size: 22px !important;
      transform: rotate(45deg) !important;
    }

    &.alt {
      border-radius: 50% !important;
      z-index: 999999 !important;
      padding: 0 !important;
      transition: all 0.3s ease !important;
      top: 25px !important;
      right: 30px !important;
      min-width: 40px !important;
      min-height: 40px !important;

      span.btn-icon {
        font-size: 20px !important;
      }

      &:hover {
        opacity: 0.88 !important;
      }
    }
  }

  .fwidth{
    width:100% !important;
  }

  /*Landing page - accueil*/

  .rgpd-title{
    font: 13px/16px upgrade;
    letter-spacing: 0px;
    color: #FFFFFF;
  }

  .icon-location{
    position: relative;
    top: -20px;
    margin: 0 auto;
  }

  .landing-link{
    text-decoration: underline !important;
    color: #FFFFFF;
  }

  .main-logo{
    max-width: 56px;
    margin-top: 3px;
    padding-top: 3px;
  }

  .menu-items {
    margin-left: 48px !important;
  }

  .menu-register-btn{
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 7px;
    padding: 10px;
    color: #1D2B47 !important;
  }
  .menu-register-btn:hover{
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  .outil-description-container{
    position: relative;
    top: -60px;
    min-height: 640px;
    background: #212A3C;
    padding: 100px 10%;
    color:#fff;
  }

  .outil-description-container .tools-des{
    text-align: center;
    width: 55%;
    display: inline-block;
    vertical-align: top;
    margin-top: 45px;
  }

  .outil-description-container .tools-des h1 {
    font-weight: 300;
    font-size: 40px;
    line-height: 54px;
    color: #fff;
    width:85%;
    margin:0 auto;
    margin-bottom:50px;
    max-width:465px;
  }

  .btn-blue{
    border-radius: 7px;
    padding: 10px 33px;
    font-weight:300;
    color:#fff;
    text-decoration: none;
    width: 238px;
    height: 40px;
    background: #185490 0% 0% no-repeat padding-box;
    border-radius: 7px;
    opacity: 1;
    cursor:pointer;
  }

  .btn-red {
    border-radius: 7px;
    padding: 10px 33px;
    font-weight:300;
    color:#fff;
    text-decoration: none;
    width: 238px;
    height: 40px;
    background-color: rgb(200, 80, 80);
    border-radius: 7px;
    opacity: 1;
    cursor:pointer;
  }

  .btn-grey{
    border-radius: 7px;
    padding: 10px 33px;
    font-weight:300;
    color:#fff;
    text-decoration: none;
    width: 238px;
    height: 40px;
    background: #B2B7C1 0% 0% no-repeat padding-box;
    border-radius: 7px;
    opacity: 1;
    cursor:pointer;
  }

  .outil-description-container .tools-des p{
    text-align: center;
    font: 18px/30px upgrade;
    letter-spacing: 0px;
    color: #FFFFFF;
    width:270px;
    margin:0 auto;
    font-weight: 300;
    margin-bottom:50px;
  }

    .outil-description-container .tools-img{
      display: inline-block;
      width: 45%;
    }

    .outil-description-container .tools-img img{
      width: 100%;
    }

  .services-header{
    width: 44%;
    text-align:left;
    margin:20px;
  }
  .services-header h1 {
    font-weight: 300;
    font-size: 40px;
    line-height: 54px;
    color: #1D2B47;
  }
  .services-header h1 strong {
    font-weight:bold;
  }
  .services-header p{
    line-height: 30px;
    color: #1D2B47;
  }

  .lets-start-container{
    position: relative;
    top: -60px;
    min-height: 600px;
    background: #212A3C;
    padding: 100px 10%;
    color:#fff;
  }

  .lets-start-content{
    width: 50%;
    text-align:center;
    margin:0 auto;
  }

  .lets-start-content h1{
    margin-top: 20px;
    color: #185490;
    font-weight: 400;
    font-size: 40px;
  }

  .lets-start-content p{
    font-weight:300;
    font-size: 40px;
    line-height:54px;
    margin-bottom: 60px;
  }

  .btn-white-big{
    border-radius: 7px;
    padding: 18px 30px;
    font-weight:400;
    color: #1D2B47;
    text-decoration: none;
    width: 244px;
    height: 58px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 7px;
  }

  .glyph-icon{
    margin-right: 10px;
  }


  /*Header fix*/
  header {
    padding-top: 45px;
  }
  .sticky-nav-active > div > header{
    padding: 7px 19px !important;
  }

  /* Login css */
  .login-header ul{
    position: fixed;
    top: 50px;
    right: 60px;
  }
  .login-header .back-button{
    color:#fff;
    text-decoration: none;
    position: fixed;
    top: 50px;
    left: 60px;
  }

  .back-button img{
    height: 40px;
  }

  .login-content{
    position:relative;
    top:20vh;
    width: 80%;
    max-width: 900px;
    margin:0 auto;
    text-align:center;
  }

  .login-content-left, .login-content-right{
    display:inline-block;
  }
  .login-content-right{
    vertical-align: top;
  }
  .login-content-right h1{
    line-height: 38px;
  }
  .login-content-right a{
    width: 290px;
  }

  .vl {
    display: inline-block;
    border-left: 1px solid #ffffff73;
    height: 500px;
    vertical-align: top;
    margin: 0px 100px;
  }

  .login-content h1{
    color:#fff;
    font-weight:300;
    margin-bottom: 60px;
  }

  .login-content p {
    color: #fff;
  }

  .login-content p.error {
    color: #f44;
  }

  .login-form{
    position: relative;
    display: inline-block;
    vertical-align: top;
  }

  .login-form h1{
    font-weight:300;
    color: #1D2B47;
    font-size:30px;

  }
  .login-form form{
    width:400px;
  }
  .login-form form button{
    border:none;
  }
  .login-form .btn-blue, .login-form .btn-red {
    width: 75%;
  }

  .login-success{
    padding: 10px;
    background: #B2DD62;
    width: 320px;
    border-radius: 3px;
    margin: 10px auto;
  }
  .login-failed{
    padding: 10px;
    background: #dd6262;
    width: 90%;
    border-radius: 3px;
    margin: 15px auto;
    color: #fff;
    font-weight: 500;
    text-align:center;
  }
  .sm-text{
    margin-top:15px;
    color:#fff;
    font-size:12px;
    width:100px;
  }
  .field-login{
    width:100% !important;
  }
  .login-width{
    width:75% !important;
  }
  .stay-connected-label{
    color: #fff;
    opacity: 1;
    width: 70%;
    margin: 2px;
    font-weight: 300;
    line-height: 21px;
    font-size: 14px;
    text-align:left;
  }



  /* Register css */

  .register-left{
    display: block;
    min-width: 45vw;
    max-width: 65vw;
    top:0;
    left: 0;
    bottom: 0;
    background-image:
    linear-gradient(to bottom, #212a3ceb, #212a3cd1),
    url(${bgRegister});
    background-size: cover;
    background-repeat: round;
    padding:2vh 50px;;
  }
  .register-left > img{
    height:40px;
    position: absolute;
  }

  .register-left-features{
    margin: 0 auto;
    display:block;
    padding:0px 0vw 0vw 130px;;
    text-align:left;
    top: 5vh;
    position: relative;
  }

  .register-left-features ul li strong{
    font-weight:800;
    color:#fff;
  }

  .form-field .cgu-label {
    margin: 0;
    font-size: 14px;
    width: 90%;
    color:#777F90;
  }

  .checkmark-icon{
    height: 33px;
    vertical-align: middle;
    margin-right: 20px;
  }

  .register-left h1{
    margin-top:4vh;
    font-weight: 300;
    color:#fff;
    font-size:37px;
    line-height: 43px;
    margin-bottom: 50px;
    texct-align:left;
  }

  .register-left ul li{
    margin: 40px 0px;
    color:#dfdfdf;
    text-align:left;
    display: flex;
    align-items: center;
  }

  .register-left ul li p{
    margin: 0px;
    margin-top: 2px;
  }

  .register-left ul li:last-child img {
    visibility: collapse;
  }

  .register-left ul li span{
    color:#B2DD62;
    font-size: 22px;
    vertical-align: middle;
  }

  .register-left ul{
    max-width: 25vw;
  }


  .register-form{
    position: relative;
    display: inline-block;
    vertical-align: top;
    top: 11.5vh;
    left: 110px;
    margin-bottom: 11.5vh;
  }

  .register-form h1{
    font-weight:300;
    color: #1D2B47;
    font-size:30px;
  }
  .register-form h1 strong{
    font-weight:600;
  }
  .register-form form{
    width:400px;
  }
  .register-form form button{
    border:none;
    font-size:16px
    padding:10px;
    font-weight:600;
    width:90%;
  }
  .register-form a .link-text{
    color: #185490;
    font-size: 15px;
    font-weight:500;
  }

  .register-form .lite-text{
    color:#777F90;
    font-weight:400;
    font-size: 15px
  }

  .form-field{
    display:inline-block;
    width:190px;
    margin-bottom:20px;
  }
  .form-field span{
    display:block;
    width:100%;
    text-align:left;
    color:#777F90;
    font-size: 12px;
    margin-bottom: 11px;
    text-transform: uppercase;
    font-weight: 500;
    margin-top: 10px;
  }
  .password-field{
    color: #3b679e;
    font-size: 24px;
  }
  .form-field input{
    width: 90%;
    height: 10px;
    border-radius:7px;
    border:none;
    padding:20px;
    border:1px solid #c4c2c2;
  }

  .form-field input:focus{
    background: #f5f8ff;
  }

  .field-email{
    width:95% !important;
  }

  .password-show-btn{
    position: relative;
    top: -35px;
    left: 120px;
    cursor:pointer;
  }
  .password-show-btn img{
    height:30px;
  }
  .has-relative-child{
    margin-bottom:0px;
  }

  .horizontal-divider {
    overflow: hidden;
    text-align: center;
    margin: 20px 0px;
    color: #FFF;
  }
  
  .horizontal-divider:before,
  .horizontal-divider:after {
    background-color: #fff;
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 25%;
  }
  
  .horizontal-divider:before {
    right: 0.5em;
    margin-left: -50%;
  }
  
  .horizontal-divider:after {
    left: 0.5em;
    margin-right: -50%;
  }

  #forgotPasswordButton {
    margin-top: 10px;
  }


  .menu-goback-btn{
    background: #d3dfea 0% 0% no-repeat padding-box;
    border-radius: 7px;
    padding: 7px;
    color: #185490 !important;
    font-size:15px !important;
    font-weight:bold !important;
    width:30px;
    height:30px;
    text-align:center;
  }
  .menu-goback-btn span, .goback-light span{
    transform: rotate(45deg);
    display: inherit;
    transition: all .2s;
  }
  .menu-goback-btn span:hover, .goback-light span:hover{
    transform: rotate(-45deg) !important;
  }
  
  .goback-light{
    background: #d3dfea8a 0% 0% no-repeat padding-box;
    border-radius: 7px;
    padding: 7px;
    color: #fff !important;
    font-size:15px !important;
    font-weight:bold !important;
    width:30px;
    height:30px;
    text-align:center;
  }

  @media only screen and (max-width: 1250px) {
    .vl{
      display:none;
    }
    .login-content-right{
      margin-top:40px
    }
  }


  @media only screen and (max-width: 1300px) {
    .register-left{
      display:none;
    }
    .register-form{
      top: calc(15vh);
    }
  }
  

  @media only screen and (max-height: 600px) {
    .register-left h1{
      margin-top:10px;
    }
  }


  /* Tarifs */

  .pricing-content{
    position:relative;
    min-height:110vh;
    background:#F5F5F5;
    margin-bottom: 60px;
    text-align:center;
  }

  .pricing-title{
    width: 100%;
    margin: 0 auto;
    padding: 73px 0px 10px 0px;
    padding-top: 73px;
    text-align: center;
  }

  .pricing-title h1{
    color:#1D2B47;
    font: 45px/44px upgrade;
    font-weight:300;
  }

  .pricing-title p{
    text-transform: uppercase;
    color: #777F90;
    font:  10px/12px upgrade;

  }

  .pricing-plan-container{
    display:inline-block;
    height:auto;
    background:#fff;
    border-radius:10px;
    max-width:300px;
    width:33%;
    margin-right:30px;
  }

  .pricing-plan-header{
    padding: 40px 0px;
    margin-bottom: 30px;
    border-radius: 10px 10px 0px 0px;
  }

  .pricing-plan-recommended{
    position: relative;
    border-radius: 10px 10px 0px 0px;
    color: #fff;
    font-weight: bold;
    height: 25px;
    padding-top: 3px;
    top: -40px;
    margin-bottom: -27px;
    left: 0;
    right: 0;
    background: #B2DD62;
  }

  .pricing-plan-header h2{
    font-weight:bold;
    font-size:24px;
    margin-bottom:0px;
  }

  .pricing-plan-header span{
    font-weight:300;
    font-size:19px;
  }

  .pricing-plan-header p{
    font-weight:300;
    font-size:12px;
    margin-bottom:30px;
  }

  .pricing-plan-part {
      margin-bottom:30px;
  }

  .pricing-plan-part h3{
    color:#1A202C;
    font-size:17px;
  }

  .pricing-plan-part h4{
    color:#185490;
    font-size:14px;
    margin-bottom: 5px;
  }

  .pricing-plan-part p{
    color:#777F90;
    font-size:14px;
  }


  .lightblue{
    color:#fff;
    background:#9CC7F9;
  }

  .darkblue{
    color:#fff;
    background:#3A90F4;
  }

  .op0{
    opacity:0;
  }

  /* Separator CSS */

  .separator {
    display: flex;
    align-items: center;
    text-align: center;
    width: 530px;
    display: inline-flex;
    margin-top: 50px;
    margin-bottom: 0px;
    color:#1D2B47;
    font-weight: 500;
  }
  .separator::before, .separator::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid rgba(101, 134, 163, 0.58);
    }
  .separator::before {
      margin-right: .25em;
  }
  .separator::after {
      margin-left: .25em;
  }

  .opa0{
    opacity: 0;
  }

  /* Values */
  .values-content{
    height:auto;
    min-height:100vh;
    padding-bottom:50px;
    width:100%;
    background:#F5F5F5;
    padding-left:250px;
    padding-top:25px;
  }

  /* Side bar */
  .values-sidebar{
    position:fixed;
    width:250px;
    height:100vh;
    background:#1a202c;
    top:0;
    left:0;
  }
  .values-sidebar ul{
    margin:0;
    margin-top:100px;
  }
  .values-sidebar ul li{
    margin-bottom:18px;
    font-weight:300;
    font-size:18px;
    color:#fff;
    cursor:pointer;
    padding:10px 0px 10px 20px;
    color:#767980;
  }
  .values-sidebar ul li a{
    transition: color .2s

  }
  .values-sidebar ul li:hover{
    color:#fff !important;
  }
  .values-sidebar ul li:hover img{
    opacity: 1;
  }
  .side-active{
    font-weight: bold !important;
  }

  .sidemenu-icon{
    display: inline-block;
    width: 20px;
    vertical-align: middle;
    margin-right: 15px;
    opacity: .5;
    transition: opacity .2s
  }
  .menu-active .sidemenu-icon{opacity: 1 !important;}

  .values-sidebar li a{
    font-weight:300;
    cursor:pointer;
    font-size: 17px;
    text-decoration:none;
    color:#767980;
  }
  .menu-active{
    font-weight:500 !important;
    background:#313742;
    border-left: 2px solid white;
    color: #fff !important;
  }

  
  .menu-active a{
    color:#fff !important;
  }
  .action-manage-asset{
    width:100%;
    padding:0px 33px;
    margin-top:80px;
  }
  .action-manage-asset h1{
    font-size:19px;
    color:#fff;
    font-weight: 500;
  }

  .action-manage-asset p{
    color:#777F90;
    font-size:12px;
    margin-bottom:25px;
  }
  .action-manage-asset a{
    padding: 10px 10px;
  }

  .action-manage-asset a img{
    width: 14px;
    vertical-align: middle;
    margin-right: 2px;
  }
  .action-manage-asset .btn-blue{
    padding: 10px 33px;
  }

  /* Investissement */
  .invest-specs{
    width:100%;
    padding: 48px 72px;
  }
  .invest-specs h1{
    font-weight:300;
  }
  .invest-specs > h1 > strong{
    font-weight:400;
  }
  .invest-specs-indice{
    display:inline-block;
    height:300px;
    background:#fff;
    padding:24px;
    max-width:250px;
    border-radius: 5px;
  }
  .invest-specs-indice h4{
    font-size: 13px;
  }
  .invest-specs-indice p{
    font-size: 13px;
    color:#777F90;
    text-decoration:underline;
    cursor:pointer;
  }
  .invest-specs-list{
    display:inline-block;
    width: calc(100% - 250px);
    padding-left:50px;
  }
  .invest-specs-list h1{
    font-weight:300;
  }
  .invest-specs-list h1 strong{
    font-weight:500;
  }
  .invest-specs-list ul{

  }
  .invest-specs-list ul li{
    margin: 24px 0px;
  }
  .invest-specs-list ul img{
    margin-right:10px;
    vertical-align: middle;
  }

  .transaction-peak{
    width:95%;
    margin: 30px auto;
  }

  .surface-blocs{
    background-color: #fff;
    width: 95%;
    margin: 30px auto;
    border-radius: 5px;
  }

  .invest-surface{
    width:95%;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .invest-surface h1{
    font-size:30px;
    color: #1A202C;
    font-weight:600;
  }
  .lite-text{
    color:#B7B7B7;
    font-weight:300;
  }

  .invest-surface-msquare{
    min-height:336px;
    max-height:450px;
    background:#fff;
    border-radius: 5px;
    padding: 33px 63px;
  }
  .invest-surface-msquare p{
    font-weight:300;
    font-size:16px;
  }
  .invest-surface-msquare p strong{
    font-weight:400px;
  }
  
  .invest-stats-row{
    width:100%;
    padding-left:70px;
  }

  .invest-stats-container{
    display: inline-block;
    background: #fff;
    padding: 40px 10px;
    border-radius: 5px;
    width: 47%;
    margin-right: 8px;
    vertical-align: top;
    padding-bottom: 48px;
  }

  .transaction-list-container
  {
     margin-left: 28px;
  }

  .arrow_box {
	position: relative;
	background: #FFFFFF;
	border-left: 6px solid #185490;
  border-radius: 10px;
  padding: 15px;
  width: 98%;
}
.arrow_box:after, .arrow_box:before {
	top: 100%;
	left: 4%;
	border: solid transparent;
	content: "";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
}

.arrow_box:after {
	border-color: rgba(136, 183, 213, 0);
	border-top-color: #ffffff;
	border-width: 0px;
	margin-left: -30px;
}
.arrow_box:before {
	border-color: rgba(194, 225, 245, 0);
	border-top-color: #ffffff;
	border-width: 15px;
	margin-left: -36px;
}

.gradient-box
{
  vertical-align: top;
    width: 98%;
    display: inline-block;
    margin-left: 0px;
    color: #FFF;
    padding: 10px 20px 10px 30px;
    font-size: 20px;
    border-radius: 10px;
    line-height: 24px;
    background: rgb(253,107,153);
    background: -moz-linear-gradient(274deg,rgba(253,107,153,1) 0%,rgba(222,132,210,1) 50%,rgba(194,142,253,1) 100%);
    background: -webkit-linear-gradient(
274deg
,rgba(253,107,153,1) 0%,rgba(222,132,210,1) 50%,rgba(194,142,253,1) 100%);
    background: linear-gradient(
274deg
,rgba(253,107,153,1) 0%,rgba(222,132,210,1) 50%,rgba(194,142,253,1) 100%);
    -webkit-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fd6b99",endColorstr="#c28efd",GradientType=1);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fd6b99",endColorstr="#c28efd",GradientType=1);
}

  @media screen and (max-width: 1280px) {
    .invest-row{
      display: block;
      width: 95%;
      margin: 0 auto;
    }
    .invest-row h1{
      font-size: 18px;
      font-weight: 300;
      margin-bottom: 30px;
      margin-left: auto;
      margin-right: auto;
    }
    .invest-container{
      background: #fff;
      border-radius: 5px;
      text-align: center;
      padding: 40px 10px;
      margin: 15px 10px 72px 10px
    }
    .invest-title{
      font-size: 30px;
      color: #1A202C;
      font-weight: 400;
      margin-bottom:0px;
      text-align:left;
      margin: 0 auto;
      width: 95%;
      padding-top: 43px;
      padding-left: 10px;
    }
  }

  @media screen and (min-width: 1280px) {
  .invest-row{
    display: flex;
    margin: 20px auto 0 auto;
    justify-content: space-between;
    width: 95%;
    margin-bottom: 30px;
  }
  
  .invest-row h1{
    font-size: 18px;
    font-weight: 300;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .invest-container{
    background: #fff;
    width: 49%;
    border-radius: 5px;
    text-align: center;
    padding: 40px 10px;
  }
  .invest-title{
    font-size: 30px;
    color: #1A202C;
    font-weight: 600;
    margin-bottom:0px;
    text-align:left;
    margin: 0 auto;
    padding-top: 43px;
    width: 95%;
  }
}



  .invest-stats-container h1{
    font-size:18px;
    font-weight:400;
    margin-bottom:30px;
  }

  .invest-transaction-small
  {
     color: #777F90;
  }

  .invest-stats-container h1 strong{
    font-size:18px;
    font-weight:600;
  }

  .invest-stats-container .invest-title
  {
     text-align: left; 
  }

  .transac-chart{
    height:200px;
  }
  .square-progress{
    text-align:center;
  }

  .square-progress li{
    margin: 20px 0px;
  }
  .square-progress li span{
    font-weight: 500;
    display:inline-block;
    min-width:100px;
    font-size:13px;
  }

  .square-progress li span:nth-of-type(2){
    color:#185490;
    font-weight:700;
    text-align:center;
    font-size:17px;
  } 
  .square-progress li img{
    padding-right: 20px;
    vertical-align: middle;

  }

  @media (max-width: 1460px) {
    .progressbar-container{
      width:40px !important;
    }
    .invest-stats-row-fix{
      padding-left:0px !important;
    }
    .invest-stats-container{
      display: inline-block;
      background: #fff;
      padding: 40px 10px;
      border-radius: 5px;
      width: 42%;
      margin-right: 0px;
      vertical-align: top;
    }
  }

  @media (max-width: 1060px) {
    .invest-stats-container{
      margin-top:20px !important;
      width:95%;
      display:block;
    }
  }


  /* Full access */

  .restricted-to-members{
    text-align:center;
    display:block;
    margin:0 auto;
    width:100%;
    margin-top: 50px;
  }

  .restricted-to-members hr{
    width:40%;
  }

  .restricted-to-members p{
    width:100%;
  }

  .restricted-to-members a{
    background: #185490;
    color: #fff !important;
    display: block;
    width: 240px;
    text-align: center;
    margin: 0 auto;
  }

  .btn-loading-state{
    background:#909090 !important;
  }


  .fullaccess-filters{
    width:95%;
    margin: 0 auto;
    margin-bottom:40px;
  }
  .fullaccess-show-filter{
    display:none;
  }

  .fullaccess-filters h1{
    font-size:30px;
    font-weight:400;
  }

  .fullaccess-filters p{
    font-size:17px;
    color:#777F90;
    width:100%;
  }

  .fullaccess-filters .btn-grey,
  .fullaccess-filters .btn-red {
    margin:10px;
  }

  .fullaccess-results{
    width:95%;
    margin:0 auto;
    background:#fff;
    padding:36px;
    margin-bottom: 30px;
    border-radius: 5px;
  }

  .fullaccess-results > h1{
    text-align: left;
    font:  28px/33px upgrade;
    letter-spacing: 0px;
    color: #1A202C;
    opacity: 1;
  }

  .fullaccess-results table{
    width:100%;
    border-collapse: collapse;
  }

  .fullaccess-results table thead tr{
    background: ##FFFFFF;
    height: 33px;
  }

  .fullaccess-results table thead tr th {
    text-align:left;
    padding-left:10px;
    margin: 0;
    font-weight: 600;
    color: #B7B7B7;
    font-size: 16px;
    text-transform: capitalize;
  }

  .fullaccess-results table th:last-child{
    border-radius:0px 10px 10px 0px;
  }

  .fullaccess-results table th:first-child {
    border-radius:10px 0px 0px 10px;
  }

  .fullaccess-results table td{
    padding: 15px 10px;
  }

  .fullaccess-sorting{
    display: inline-block;
    margin-right: 40px;
  }
  .fullaccess-sorting select{
    display: inline-block;
    padding: 5px;
    border-radius: 4px;
  }
  .fullaccess-sorting p{
    display:inline-block;
    margin-right:10px;
    color:#1A202C;
    font-weight: 500;
  }
  .fullaccess-table-header{
    margin-bottom:0px;
  }
  .fullaccess-sorting .year-selector{
    display:inline-block;
  }

  .filters-container{
    width:100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
  }
  .filters-container .filters-group{
    flex: 1;
    padding: 16px 0;
  }
  .filters-container .filters-group:not(:last-of-type) {
    margin-right: 30px;
  }
  .filters-container .filters-group .react-datepicker-wrapper{
    width: 50%;
  }
  .filters-container .filters-group .react-datepicker-wrapper input {
    border: 1px solid black;
  }

  @media only screen and (max-width: 1157px){
    .react-datepicker-wrapper{
      width: 50%;
    }
    .filters-container .filters-group{
      display: inline-block;
      vertical-align: top;
      width: 27%;
      margin: 16px auto;
      margin-right: 40px;
    }
  }
  @media only screen and (max-width: 1040px){
    .filters-container {
      flex-direction: column;
    }
    .react-datepicker-wrapper{
      width: 50%;
    }
    .filters-container .filters-group{
      display: block;
      vertical-align: top;
      width: 90%;
      margin: 16px auto;
      margin-right: 40px;
    }
  }



  .filters-container div .filter-title{
    display: inline-block;
    width: auto;
    font-weight:bold;
    color:#1D2B47;
    font-size:16px;
    margin-bottom:20px;
  }
  .filters-container div .filter-title label{
    display: inline-block !important;
    vertical-align: middle;
    margin-left: 10px;
  }
  .filters-group .rc-slider {
    width: 90%;
    margin-left: 8px;
  }
  .filters-group .rc-slider-track{
    height:5px;
    background-color: #185490;
  }

  .datepicking .filters-dates .react-datepicker-wrapper div input{
    border: 1px solid lightgrey;
    border-radius: 5px;
    padding: 5px;
    width: 80%; 
    font-size: 12px;
    color: #777F90;
    display: inline-block;
  }

  .circle-grey{
    height:38px;
    width:38px;
    background:#DBDBDB;
    border-radius:50%;
    display:inline-block;
    float:left;
    margin-right:20px;
  }

  .result-adresse{
    color:#1D2B47;
    font-size:18px;
    font-weight:500;
  }
  .result-distance{
    color:#185490;
    font-weight:300;
    font-size:18px;
    margin-left:5px;
    display:inline-block;
  }
  .result-undertext{
    color: #777F90;
    font-size:12px;
    display: block;
    font-weight:300;
    margin-left: 60px;
  }
  .result-undertext-nm{
    color: #777F90;
    font-size:12px;
    display: block;
    font-weight:300;
  }

  td{
    font-weight:500;
    color:#1D2B47;
  }
  .color-blue{
    color:#185490;
    font-size:20px;
    width: 140px;
    text-align: right;
  }

  .color-green{
    color:#B2DD62;
    font-size:27px;
    font-weight:400;
  }

  .color-green-right{
    color:#B2DD62;
    font-size:27px;
    width: 190px;
    padding-right: 20px !important;
    font-weight:400;
    text-align: right;
  }

  .color-red{
    color:#dd6262;
    font-size:27px;
    font-weight:400;
  }

  .color-red-right{
    color:#dd6262;
    font-size:27px;
    font-weight:400;
    width: 190px;
    padding-right: 20px !important;
    text-align: right;
  }

  .color-green-map{
    color:#B2DD62;
    background: #B2DD62;
    padding: 8px;
    border-radius: 10px;
  }

  .color-green-map strong
  {
    color: #fff !important;
  } 

  .color-red-map{
    color:#dd6262;
    background: #dd6262;
    padding: 8px;
    border-radius: 10px;
  }
   
  .color-red-map strong
  {
    color: #fff !important;
  } 

  .blur{
    filter: blur(5px);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }

  .unluck-premium{
    position:relative;
    bottom:50vh;
    width:480px;
    margin:0 auto;
    text-align:center;
  }
  .unluck-premium h1{
    font-weight:300;
    color:#1D2B47;

  }
  .unluck-premium span{
    font-weight:500;
  }
  .unluck-premium .btn-blue{
    background:#3A90F4
  }

  /* Transactions */

  .transactions-filters{
    width:95%;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  .transactions-filters h1{
    font-size:30px;
    font-weight:600;
    width:70%;
    display:inline-block;
    color:#1A202C;
  }

  .transactions-filters .btn-blue{
    display:inline-block;
    text-align:center;
    float:right;
    font-weight: 400;
  }

  .bellIcon {
    height: 22px;
    float: left;
    position: relative;
    left: 15px;
    top: -2px;
}

  .fullaccess-results .small-text{
    font-size:18px;
    margin-bottom:30px;
  }

  .table-transactions tbody tr:nth-child(odd) 
  {
    background: #F5F5F5;
    border-bottom: 1px solid #F5F5F5 !important;
    border-top: 1px solid #F5F5F5 !important;
  }

  .table-transactions tbody tr:not(:last-of-type){
    border-bottom: 1px solid #DFE2EB;
  }

  .table-transactions + .restricted-to-members {
    margin: 30px 0;
  }

  .transactions-quantity{
    background:#fff;
    border-radius:5px;
    width:90%;
    margin:0 auto;
    padding:36px;
    min-height:185px;
    margin-top:30px;
  }

  .transactions-quantity div{
    display:inline-block;
    width:50%;
    text-align: left;
  }
  .transactions-quantity div p{
    font-weight:300;
    font-size:18px;
    color:#1A202C;
  }.transactions-quantity div p strong{ font-weight:500 }


  .transactions-quantity div h1{
    color: #B2DD62;
    font-size:66px;
    font-weight:300;
    width:auto;
    display:inline-block;
    position: relative;
    top: -15px;
  }
  .transactions-quantity div img{
    position: relative;
    display: inline-block;
    top: -15px;
    left: 15px;
  }

  .transactions-quantity div span{
    position: relative;
    display: inline-block;
    top: -10px;
    left: 35px;
    color: #888F9D;
    font-weight: 500;
    width: 30%;
  }

  .values-container{
    background:#fff;
    border-radius:5px;
    width:95%;
    margin:0 auto;
    padding:36px;
    min-height:185px;
    margin-top:30px;
  }

  .transactions-surface div{
    display:inline-block;
    width:50%;
  }
  .transactions-surface div p{
    font-weight:300;
    font-size:18px;
    color:#1A202C;
  }.transactions-surface div p strong{ font-weight:500; color: #888F9D !important; }

  .transactions-p
  {
     color: #777F90;
     font-size: 16px;
  }

  .surface-main .invest-title
  {
     padding-top: 0px !important;
  }
   
  .surface-main .invest-stats-right
  {
      padding-bottom: 0px !important; 
  } 

  .invest-stats-container{
    margin-top:30px;
  }
  .transac-stats .invest-stats-container{
    height:300px;
  }

  strong{
    font-weight:500;
  }

  .transaction-dynamisme{
    width:100%;
    padding: 48px 72px;
  }
  .transaction-dynamisme h1{
    font-size:30px;
    color: #1A202C;
    font-weight:400;
  }
  .lite-text{
    color:#777F90;
    font-weight:300;
  }

  .blue-value{
    color: #185490;
    font-size:24px;
    font-weight:500;
  }

  .dynamisme-container{
    background: #fff;
    width: 100%;
    min-height: 115px;
    padding: 20px 50px;
    margin-bottom: 45px;
    border-radius: 5px;
    text-align: center;
  }

  .dynamisme-container::after{
    content: '';
    position: relative;
    top: 72px;
    width: 24px;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 50px solid #ffffff;
    clear: both;
  }

  .dynamisme-container img{
    display:inline-block;
    width:60px;
    vertical-align:middle;
  }
  .conclusion img{
    width: 140px !important;
  }
  .dynamisme-container p{
    display:inline-block;
    margin-left:20px;
    width:80%;
    text-align: left;
    vertical-align:middle;
  }

  .conclusion::after{
    display:none;
  }

  .conclusion{
    padding:50px 18%;
    background:#185490 !important;
    min-height:270px !important;
  }

  .conclusion p{
    font-size:29px !important;
    color:#fff !important;
    font-weight:300;
    width: 100%;
  }
  .conclusion h4{
    color:#B2B7C1;
    text-transform:uppercase;
    font-weight:500;
    font-size:14px;
  }

  /* Plus value */

  .plusvalue-row{
    display: flex;
    margin: 40px auto;
    width: 95%;
    justify-content: space-between;
  }

  .plusvalue .btn-blue{
    top: -70px;
    position: relative;
  }

  .plusvalue-description{
    width:70%;
    color:#777F90;
    line-height:24px;
  }

  .plusvalue-container{
    background:#fff;
    padding:21px 41px;
    border-radius:5px;
    width:49%;
    min-height: 340px;
  }

  .plusvalue-container p{
    font-size:18px;
    color:#1A202C;
  }
   
  .plus-value-table tr
  {
      background: #F5F5F5;
      border-bottom: 20px solid #fff;
      border-radius: 10px;
  } 
  
  .plus-value-table tr td
  {
     width: 20%;
  }

  .plus-value-table .tr-border
  {
    border-right: 1px solid #E3E3E4;
  }

  .plus-value-table tr td .plus-value
  {
    color: #B2DD62;
    font-size: 28px;
    font-weight: 400;
  }

  .plus-value-table tr td p
  {
     margin-top: 0px;
     margin-bottom: 0px;
     color: #B7B7B7; 
  }

  .plus-value-table tr td h4
  {
     margin-top: 0px;
     margin-bottom: 0px;
     color: #185490;
     font-weight: 500;
     font-size: 20px;
  }

  .stats-evolution h1{
    display:inline-block;
    font-size:73px;
    font-weight:300;
  }
  .stats-evolution h2{
    display:inline-block;
    font-size:24px;
    margin-left:20px;
    font-weight:400;
    vertical-align: text-bottom;
  }
  .stats-blur{
    background:#bababa;
  }
  .stats-blur .unlock-premium{
    position:relative;
    width:100%;
    top:-140px;
    margin-bottom:-140px;
    text-align:center;
  }

  .stats-blur .unlock-premium h1{
    font-size:33px;
    color:#fff;
  }

  .plusvalue-adresse-big{
    font-size:41px;
    font-weight:300;
    color:#1A202C;
    width:50%;
  }
  .text-table-big{
    font-size:42px;
  }


  /* Searchbar */

  .searchbar-parent{
    margin: 0 auto;
    width:95%;
    margin-bottom: 30px;
  }

  .searchbar-container{
    width: 100%;
    position: relative;
    z-index: 50;
    min-height: 60px;
    background: #fff;
    border-radius:10px;
    display: flex;
    align-items: center;
  }

  .searchbar-header{
    vertical-align: top;
    display: flex;
    align-items: center;
    width: 100%;
  }
  .searchbar-header *{
    display:inline-block;
  }

  .searchbar-header h1{
    color:#1D2B47;
    font-size:17px;
    margin-bottom: 0;
    padding: 10px 0 10px 20px;
    text-transform: capitalize;
    width: 100%;
    position: relative;
    top: 3px;
    cursor:pointer;
  }

  .searchbar-header img{
    vertical-align:middle;
    width: 33px;
    margin-left: 20px;
  }

  .vertical-separator{
    height: 40px;
    border-left: 3px solid #eeeeee;
    vertical-align: inherit;
    margin-left: 15px;
  }

  .searchbar-header .filters{
    position:relative;
    min-width: 260px;
  }

  .searchbar-header .filters p{
    color:#185490;
    margin:14px;
    margin-left:10px;
    font-size:12px;
  }

  .searchbar-header button{
    cursor: pointer;

    background: #fff;
    border-radius: 5px;
    height: 40px;
    border:3px solid #e2e5ed;
    padding: 10px 20px;
    color: #858B98;
    font-weight: 500;
    margin-left: 10px;
    font-size: 14px;
  }

  .search-form{
    width:100%;
    padding:50px 5%;
  }

  .filter-area{
    position: absolute;
    width: 455px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 3px 6px #00000012;
    right: 0;
    top: 100%;
    transform: translateY(20px);
  }
  .filter-area .position-relative {
    position: relative;
  }
  .filter-area .search-cancel {
    display: none;
  }

  .filter-span-active{
    background:#d3dfea !important;
    color:#185490 !important;
  }

  .filter-area hr{
    background-color: #cacaca;
    height: 1px;
    border: 0;
    margin:10px 0px;
  }

  .filter-area .filter-btn{
    float: right;
    width: 100px;
    padding: 12px 20px;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
  }

  .filter-area h4, .filter-type h4{
    font: 20px/24px upgrade;
    letter-spacing: 0px;
    color: #1A202C;
    margin-bottom:10px;
  }
  .filter-type h4{
    margin-top:20px;
    margin-bottom:20px;

  }

  .filter-type-custom{
  }
  .filter-type-custom span{
    margin: 2px;
    min-width: 91px;
  }

  .filter-buttons span{
    margin:10px;
    position:relative;
    top:40px;
  }

  .search-separator{
    width:90%;
    opacity: .5;
  }

  .margin-generator{
    height:40px;
  }



  /* Progressbar container */
  .progressbar-container{
    background: #f5f5f5;
    border-radius: 5px;
    width: 120px;
    display:inline-block;
  }

  .progressbar-progress{
    background: #185490 !important;
    border-radius:5px;
  }

  /* Toggle */
  .tgl {
    display: none;
    
    // add default box-sizing for this scope
    &,
    &:after,
    &:before,
    & *,
    & *:after,
    & *:before,
    & + .tgl-btn {
      box-sizing: border-box;
      &::selection {
        background: none;
      }
    }
    
    + .tgl-btn {
      outline: 0;
      display: block;
      width: 4em;
      height: 2em;
      position: relative;
      cursor: pointer;
      user-select: none;
      &:after,
      &:before {
        position: relative;
        display: block;
        content: "";
        width: 42%;
        height: 100%;
      }
      
      &:after {
        left: 0;
      }
      
      &:before {
        display: none;
      }
    }
    
    &:checked + .tgl-btn:after {
      left: 50%;
    }
  }
  
  // themes
  .tgl-light {
    + .tgl-btn {
      background: #E6E6E6;
      border-radius: 2em;
      padding: 5px;
      transition: all .4s ease;
      &:after {
        border-radius: 50%;
        background: #BFC2C8;
      }
    }
    
    &:checked + .tgl-btn {
      background: #b2dd62;
    }
  }

  /* Checkbox */
  .search-checkbox {
    -webkit-user-select: none !important;
       -moz-user-select: none !important;
        -ms-user-select: none !important;
            user-select: none !important;
  }
  .search-checkbox input {
    display: none;
  }
  .search-checkbox span {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    background:#fff;
    border-radius:5px;
    height:40px;
    padding:10px 15px;
    color:#777F90;
    font-weight:500;
    margin-left:5px;
    cursor: pointer;
    border: 3px solid #e2e5ed;
  }
  .search-checkbox span:empty {
    padding-left: 0;
  }


  .type-filter-search span:before{
    left: 6px;
  }

  .type-filter-search input:checked + span:after{
    left: 10px !important;
  }


  .search-checkbox input:checked + span{
    background:rgba(24, 84, 144, 0.2);
    color: #185490;
  }
  .search-checkbox input:checked + span:after {
    opacity: 1;
    top: 13px;
    left: -4px;
    border-color: transparent transparent #fff #fff;
    box-shadow: inset 1px -1px 0 #fff;
    -webkit-transform: scale(1) rotate(-45deg);
            transform: scale(1) rotate(-45deg);
  }


    type-filter-search{
      
    }

    .type-filter-search img{
      display:block;
      margin:0 auto;
      margin-bottom:10px;
    }

    .type-filter-search span{
      height:auto !important;
      padding:30px !important;
      border-radius:17px;
      min-height: 140px;
      max-height: 140px;
      font-size:14px;
      text-align:center;
      width:150px;
      color:#777F90;
      margin-bottom:10px;
    }

    /* Charts */
    
    .invest-surface-msquare .transac-chart{
      width:75%;
      display:inline-block;
      height:220px;
    }
    .evolution-list{
      display:inline-block;
      width:20%;
      margin-right:20px;
      vertical-align:top;
    }
    .evolution-list li{
      padding:8px 17px;
      border:1px solid #d8d8d8;
      border-radius: 5px;
      margin-bottom:10px;
      width:100%;
      cursor:pointer;
      text-align: center;

    }
    .evolution-list li span{
      display:inline-block;
      margin-left:20px;
      color:#d8d8d8;
    }
    .active-span-filter{
      background:#1A202C;
    }

    .evolution-list li img{
      vertical-align:middle;
      
    }

    .chart-tension{
      width:60%;
      display:inline-block;
      height:230px;
      vertical-align:top;
    }
    .info-tension{
      vertical-align:top;
      width:35%;
      display:inline-block;
      margin-left:30px;
      color:#FFF;
      padding: 10px 20px 10px 30px;
      font-size:20px;
      border-radius: 10px;
      line-height:24px;
      background: rgb(253,107,153);
      background: -moz-linear-gradient(274deg, rgba(253,107,153,1) 0%, rgba(222,132,210,1) 50%, rgba(194,142,253,1) 100%);
      background: -webkit-linear-gradient(274deg, rgba(253,107,153,1) 0%, rgba(222,132,210,1) 50%, rgba(194,142,253,1) 100%);
      background: linear-gradient(274deg, rgba(253,107,153,1) 0%, rgba(222,132,210,1) 50%, rgba(194,142,253,1) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fd6b99",endColorstr="#c28efd",GradientType=1);
    
    }

    .info-tension .info-title
    {
       font-size: 20px;
    }

    .invest-surface .invest-surface-msquare .chart-tension{
      height:250px;
    }

    .text-center{
      text-align:center;
    }

    .rc-slider-handle{
      position: absolute;
      width: 29px;
      height: 28px;
      cursor: pointer;
      cursor: -webkit-grab;
      margin-top: -11px;
      cursor: grab;
      border-radius: 50%;
      border: solid 2px #185490;
      background-color: #185490;
      -ms-touch-action: pan-x;
      touch-action: pan-x;
    }
    .rc-slider-handle-dragging{
      box-shadow: unset !important;
    }

    .rc-slider-track{
      background-color: #e9e9e9;
    }

    .rc-slider-rail{
      height:8px;
    }

    .mgauto{
      font-size:37px;
      margin-bottom:10px;
      font-weight:300;
      width:100%;
    }

    .plusvalue-evolution{
      height:200px;
      position: relative;
      top: -120px;
      margin-bottom: -120px;
    }


    /* Evolution */
    .evolution-msquare-right{
      vertical-align:top;
      max-width: 25%;
      height: 250px;
      display: inline-block;
    }

    .evolution-msquare-right .year-selector{
      width:100%;
      text-align:center;
    }

    .evolution-msquare-right h1{
      color:#B2DD62;
      margin-top:30px;
      font-size:63px;
    }

    .evolution-msquare-right p{
      width:80%;
      display:block;
      margin:0 auto;
    }

    .year-active{
      color:#fff;
      background:#1A202C;
    }

    .evolution-msquare-right .year-selector span,  .year-selector span{
      display:inline-block;
      padding:5px 10px;
      border:1px solid #B7B7B7;
      border-radius:5px;
      font-size:12px;
      color:#B7B7B7;
      margin-left:10px;
      cursor:pointer;
    }


    .invest-surface .unlock-premium{
      position:relative;
      top:-240px;
      margin-bottom:-240px;
      width:500px;
      left:25vw;
    }

    .invest-surface .unlock-premium h1{
      color: #fff;
      font-weight: 300;
      width: 50;
      text-align: center;
      margin-top: 30px;
    }

    .mtchart{
      margin-bottom:120px;
    }
    .mtchart .invest-surface-msquare{
      background:#c3c3c3;

    }

    .margin-clearfix{
      margin-top:180px;
      text-align:center;
    }

  /* start Evolution page */

  .no-result
  {
    font-size: 16px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: 500;
    color: #7F8797;
  }

  .vertical-border
  {
    border-right: 2px solid #EFF0F0;
    height: 30px;
    width: 2px;
    margin-left: 20px;
    margin-right: 10px;
  }

  .btn-blue-package
  {
      margin: 0 auto;
      display: table;
      background: #3A90F4;
      padding: 10px 25px 10px 25px;
      border-radius: 8px;
      border: 1px solid #3A90F4;
      color: #FFF;
      cursor: pointer;
      transition: all 0.5s;
  }

  .btn-blue-package:hover
  {
    background: #FFFFFF !important;
    color: #3A90F4;
  }

  /* end Evolution page */

    /* Carte */

    .map-container{
      padding-left:240px;
      ${'' /* margin-bottom: 70px; */}
    }

    .map-icon-black{
      cursor:pointer;
    }

    .map-settings-cadastre{
      top:150px;
    }
    .map-settings-gain{
      top:230px;
    }

    .map-settings{
      position:fixed;
      background:#fff;
      box-shadow: 0px 3px 6px #00000029;
      height:60px;
      width:260px;
      right: 35px;
      text-align:center;
      padding-top: 12px;
      border-radius: 10px;
    }

    .map-settings p{
      font-size:11px;
      font-weight:bold;
      color:#777F90;
      display:inline-block;
      float: left;
      margin-left: 14px;
      text-transform: uppercase;
    }

    .map-settings .tgl-light + .tgl-btn{
      display:inline-block;
      vertical-align: middle;
      margin-left: 10px;
    }


    .map-price-range{
      position:fixed;
      top:310px;
      background:#fff;
      box-shadow: 0px 3px 6px #00000029;
      height:90px;
      width:260px;
      right: 35px;
      text-align:center;
      padding-top: 12px;
      border-radius: 10px;
      padding-left: 20px;
      padding-right: 20px;
    }

    .map-price-range p{
      font-size:11px;
      font-weight:bold;
      color: #777F90;
      display:inline-block;
      text-transform: uppercase;
    }

    .map-price-range > div > div.rc-slider-rail{
      height:8px !important;
    }

    .map-price-range > div > div.rc-slider-track.rc-slider-track-1{
      background-color: #185490 !important;
    }

    /* map details form */
    .map-sell-details{
      position:absolute;
      left:245px;
      background:#fff;
      width:245px;
      padding:25px 0px 0px 25px;
      bottom:0;
      top:59px;
      height: 100%;
    }

    .map-sell-details strong
    {
       font-weight: 600;
       font-size: 16px;
       color: #1D2B47;
    }

    .map-sell-details .map-sell-property-type
    {
       font-size: 14px;
       text-transform: capitalize;
       font-weight: 500;
       color: #B2B7C1; 
    }

    .map-sell-details .map-sell-address-value
    {
      color: #4C576D;
      margin-top: 0px;
      font-weight: 400;
      font-size: 16px;
    }

    .map-sell-details .glyph-icon{
      display:none;
    }

    .map-sell-details .markerIcon
    {
       filter: none;
       margin-bottom: 5px;
       width: 40px;  
    }

    .map-sell-details .close-button-content
    {
      margin-top: 0px !important;
       width: 40px;
       height: 40px;
       background: #D3DFEA;
       float: right;
       margin-right: 20px;
    }

    .map-sell-details .close-button-content .closeIcon
    {
       filter: none; 
    }

    .map-sell-details img{
      width:16px;
      margin-bottom:20px;
      filter: invert(97%) sepia(0%) saturate(224%) hue-rotate(155deg) brightness(90%) contrast(98%);
    }

    .map-sell-details h1{
      font-weight:400;
      font-size:19px;
      margin-bottom:20px;
    }

    .map-sell-details h2{
      font-weight:bold;
      font-size:15px;
      color:#B2B7C1;
      text-transform: uppercase;
    }

    .map-sell-details ul li{
      list-style-type: disc;
      list-style-position:inside;
      color:#1D2B47;
    }

    .map-sell-details p{
      color: #1D2B47;
      font-weight:bold;
      font-size:14px;
      margin-top:21px;
    }

    .map-grey-price{
      padding:8px 22px;
      color:#185490;
      font-weight:bold;
      font-size:21px;
      background:#DFE2EB;
      border-radius:6px;
      margin-bottom:20px;
      display:block;
      width:fit-content;
    }

    .map-sell-details h3{
      color:#1D2B47;
      font-size:14px;
      font-weight:400;
    }

    .map-green-price{
      padding:5px 12px;
      color:#fff;
      font-weight:bold;
      font-size:13px;
      background:#B2DD62;
      border-radius:3px;
      margin-bottom:20px;
      display:inline-block;
      width:fit-content;
      margin-right:5px;
    }

    .map-sell-details div{
      ${'' /* position:absolute; */}
      bottom:0;
      left:-12px;
      width:calc(85% + 12px);
      height:40px;
      background:#185490;
      text-align: center;
      font-weight: 500;
      cursor: pointer;
      font-size: 14px;
      color: #fff;
      padding-top: 12px;
      border-radius: 10px;
      margin-top: 40px;
      }

    .plus-mini-value 
    {
      font-weight: 500;
    }

    /* map marker */

    .map-marker-component{
      padding-bottom:30px;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%, -50%)
    }

    .map-marker-component img{
      height:30px;
      display:block;
      position:relative;
      left:20px;
    }

    .map-marker-component .map-plus-value{
      position:relative;
      left:20px;
      top:-6px;
      width: 66px;
      height: 20px;
      background: #B2DD62 0% 0% no-repeat padding-box;
      border-radius: 6px;
      background:#B2DD62;
      text-align:center;
      padding-top:4px;
      cursor:pointer;
      color:#FFFFFF;
      font-weight:bold;
      padding-left:5px;
    }

    .map-marker-component .map-plus-value::after{
      content: '';
      position: relative;
      top: 25px;
      left:-45px;
      width: 24px;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #B2DD62;
      clear: both;
    }

    .map-marker-component .map-price{
      width: 66px;
      height: 20px;
      border-radius: 6px;
      background:#185490;
      text-align:center;
      padding-top:4px;
      cursor:pointer;
      vertical-align:middle;
      color:#FFFFFF;
      font-weight:bold;
    }


    /* Autocomplete */

    .google-places-autocomplete{
      width:100%;
    }

    .google-places-autocomplete__input{
      font-family: upgrade;
      background: #FFFFFF 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #00000029;
      border-radius: 5px;
      opacity: 1;
      height: 60px;
      width: 90%;
      margin: 0 auto;
      border: none;
      display: inline;
      padding-left: 15px;
      font-size:16px;
    }
    .google-places-autocomplete__input::placeholder{
      color:#A7A7A7;
      font-weight:400;
    }
    .searchCapitalize, .searchCapitalize *{
      text-transform: none;
    }
    .search-cancel{
      position: relative;
      top: -44px;
      margin-bottom: -50px;
      float: right;
      right: 10px;
      cursor: pointer;
    }
    .search-cancel i{
      font-size: 24px;
      font-weight: 500;
      color: #999;
      transform: rotate(45deg);
    }

    .google-places-autocomplete__suggestions-container{
      width: 89%;
      margin: 0 auto;
      background: #fff;
      padding: 10px 0px;
    }

    .google-places-autocomplete__suggestion {
      padding:10px;
      cursor:pointer;
      text-align:left;
    }

    .google-places-autocomplete__suggestion:hover{
      background:#dedede;
    }

    .sponsoredBy{
      text-align: left;
      color: #636363;
      margin-top:50px;
    }


    /**************/

    .adresse-input-search{
      color: #1D2B47;
      font-size: 17px;
      vertical-align: top;
      font-weight: bolder;
      border: none !important;
      border-radius: 10px;
      width: 400px;
      position: relative;
      width: 100%;
      padding-left: 10px;
      border: 1px solid rgb(190 224 253 / 93%);
    }

    .adresse-input-search .google-places-autocomplete .google-places-autocomplete__input{
      box-shadow:none;
      color: #1D2B47;
      font-size: 17px;
      font-weight: bolder;
      width: 100%;
    }

    .adresse-input-search .google-places-autocomplete__suggestions-container{
      position:relative;
      z-index:9999;
      width:100%;
    }

    .adresse-input-search .google-places-autocomplete .google-places-autocomplete__suggestion{
      width:100%;
    }


    .landing-search{
      position: relative;
      top: -40px;
      left: 260px;
      background:#212A3C;
    }

    .landing-search-active{
      background: rgb(198 198 198) !important;
      color: #000 !important;
    }

    .soon-plus-value{
      font-size: 20px !important;
      color: #fff;
      margin-top: 50px;
    }

    .stats-row-boxes-fix{
      background: #fff !important;
      margin-top: 40px !important;
      width: 90% !important;
      margin: 30px auto !important;
    }


    .cursor-disable{
      cursor: no-drop;
    }

    .color-blue-mail{
      color: #185490;
      font-size: 11px;
    }

    /*Mobile device detection*/


    .show-no-mobile{
      display:none;
    }

    .show-no-mobile img{
      margin-bottom: 20px;
      margin-top: 20vh;
    }

    .show-no-mobile h1{
      font-weight: 500;
    }

    .show-no-mobile p{
      font-size:24px;
    }

    @media (max-width: 768px){
      .show-no-mobile{
        display:block;
        position:fixed;
        top:0;
        right:0;
        left:0;
        bottom:0;
        z-index: 99999;
        text-align: center;
        padding: 40px 20px;
        color: #fff;
        background-image:
        linear-gradient(to bottom, #212A3C96, #212A3C),
        url(${illustration});
      }
    }

    .test-map-params{
      top:350px !important;
    }

    .CookieConsent{
      z-index: 9999999 !important;
      background: #185490 !important;
    }

    #rcc-confirm-button{
      background: rgb(255 255 255) !important;
    color: #1a1a1a !important;
    margin: 10px !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    }

    .text-light{
      color:#fff;
      text-decoration: underline;
      margin-left:10px;
    }

    .cgu-text{
      display: block;
      margin: 0 auto;
      width: 60%;
      background: #fff;
      border-radius: 15px;
      padding:30px;
    }
    .cgu-text strong{
      font-weight:500;
      font-size:18px;
    }
    .cgu-header{
      display:block;
      margin:0 auto;
      width: 60%;
      padding-top: 30px;
    }
    .cgu-header h1{
      font-weight:500;
    }
    .cgu-header p{
      color: #7289a0;
      font-size: 18px;
      font-weight: 300;
    }

    .margin-auto{
      display:table;
      margin: 0 auto;
    }

    .text-cgu-link{
      color:rgba(119,127,144,0.6);
      margin: 0 5px;
    }


    .places-suggestions-container{
      width:100%;
      height:110px;
      text-align:center;
    }

    .places-suggestions-container h2{
      margin-top: 20px;
      color: #1A202C;
      font-weight: 400;
      font-size: 13px;
    }

    .places-suggestion-item{
      display:inline-block;
    }

    .places-suggestion-item h3{
      background: #2c384e;
      color: #fff;
      font-size: 11px;
      margin: 0 10px;
      font-weight: 500;
      padding: 5px;
      border-radius: 3px;
    }

    .places-light{
      color:#fff !important;
    }

    .cursor-pointer{
      cursor: pointer;
    }

    .map-button{
      background-image: url('data:image/jpeg;base64,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AAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAHg4QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQAAAAAAAACAAQ4QklNBAIAAAAAAAoAAAAAAAAAAAAAOEJJTQQwAAAAAAAFAQEBAQEAOEJJTQQtAAAAAAAGAAEAAAAFOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAA00AAAAGAAAAAAAAAAAAAAApAAAAKQAAAAwAUwBhAG4AcwAgAHQAaQB0AHIAZQAtADIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAACkAAAApAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAABudWxsAAAAAgAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAA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TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDktMjhUMTk6NTg6NTQrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDktMjhUMTk6NTg6NTQrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTA5LTI4VDE5OjU4OjU0KzAyOjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlBQkM5QzA0QjQwMUVCMTFCRTMwQjNFOTU3NUI3MjZCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk5QkM5QzA0QjQwMUVCMTFCRTMwQjNFOTU3NUI3MjZCIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OTlCQzlDMDRCNDAxRUIxMUJFMzBCM0U5NTc1QjcyNkIiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTlCQzlDMDRCNDAxRUIxMUJFMzBCM0U5NTc1QjcyNkIiIHN0RXZ0OndoZW49IjIwMjAtMDktMjhUMTk6NTg6NTQrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QUJDOUMwNEI0MDFFQjExQkUzMEIzRTk1NzVCNzI2QiIgc3RFdnQ6d2hlbj0iMjAyMC0wOS0yOFQxOTo1ODo1NCswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/7gAOQWRvYmUAZEAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgICAgICAgICAgIDAwMDAwMDAwMDAQEBAQEBAQEBAQECAgECAgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP/wAARCAApACkDAREAAhEBAxEB/90ABAAG/8QBogAAAAYCAwEAAAAAAAAAAAAABwgGBQQJAwoCAQALAQAABgMBAQEAAAAAAAAAAAAGBQQDBwIIAQkACgsQAAIBAwQBAwMCAwMDAgYJdQECAwQRBRIGIQcTIgAIMRRBMiMVCVFCFmEkMxdScYEYYpElQ6Gx8CY0cgoZwdE1J+FTNoLxkqJEVHNFRjdHYyhVVlcassLS4vJkg3SThGWjs8PT4yk4ZvN1Kjk6SElKWFlaZ2hpanZ3eHl6hYaHiImKlJWWl5iZmqSlpqeoqaq0tba3uLm6xMXGx8jJytTV1tfY2drk5ebn6Onq9PX29/j5+hEAAgEDAgQEAwUEBAQGBgVtAQIDEQQhEgUxBgAiE0FRBzJhFHEIQoEjkRVSoWIWMwmxJMHRQ3LwF+GCNCWSUxhjRPGisiY1GVQ2RWQnCnODk0Z0wtLi8lVldVY3hIWjs8PT4/MpGpSktMTU5PSVpbXF1eX1KEdXZjh2hpamtsbW5vZnd4eXp7fH1+f3SFhoeIiYqLjI2Oj4OUlZaXmJmam5ydnp+So6SlpqeoqaqrrK2ur6/9oADAMBAAIRAxEAPwDT89jjoP8AXvfuvde9+691737r3Xvfuvde9+691//Q0/PY46D/AFsf/wDCc/8AlTdf/wAwbvbf3bfyDxL7g+O/xvG2pK/Y8k1VSUXaXZm6WyVTtvbGYnpTDNPs/buNws+Qy9PHNE9TJJQU766aoqUJbuV21vGqRn9RvP0H+rh0qtYRKxZh2jrbHP8AOE/kux96f8Nz36/XAjcv+iEgdJ7cHxQXd33v93f7iNkRQf3cFAMx/uP/AIh/C/7uB/V999v+77Kfo73w/qc1pXj3fb/qz0t8eDV4WKcOGOtT3/hRl/Kk6/8A5fneWwe4Pj1h3298ePkedy/a7GimqavH9V9nbYOOq9wbaw09V5ZqbZ+58ZmIshiKaSaZ6WWCvp4/HSwU0YNttu2uI2SQ1kXz9R/q49IrqERMGX4T1rd+zLpL1737r3X/0dPz2OOg/wBb43/CQPsva+a6F+Z3Qf3y4/eeK7J2h2WwgnjpsxVbX3zsyXZgrsYxvLKu3srsg+V1DLTS18GqxmTUQ7wpEkMlO2lP2Gv+XoxsSNMi+deqIJP+E5f8zH/ZtW+N46eybbFbe5xQ+T7fY/6Fz16cj/zMp8v/ABTzeT+A/wCWHAX/AI59x/kggM3tf+8rXwfF191Ph86+n+zw6T/Sza9GnHr5dXtf8K9+zdqYLoP4YfHgZL+J74yHYm6OzbVFRFU5ik2psbZg2OuSy5BE0X95svvM+GRlC1MuOqNNzCwCDZ1Jknkp20p+01/ydKL0gLGvnXrQ+9n3Rd1737r3X//S0/PY46D/AEf3+Wb8+N/fy3/lxsD5I7Np6jOYGjWo2h21sSKp+0i7F6l3FU0L7q2uZyyRwZSnmx9LlMTM5MNPmcdSSzJLCskMie6t1uYWibj5H0P+r+XTsUhicOOHn9nX1Faj+ZJ8N6f4XH5+/wCmPAS/Gv8Aut/eKPc8M0LZmfKlTAvXUW3HnTIf6UmzQ/hf8CYLWJkQYmCgFwFvppvH+n0Hxa/6j9nz6N/Fj8PxdXZ18tv+ZH87uwv5jPy07E+S2+4JsNjcu8O1+r9jNWNXU/W/U23qmuOz9mwVJtHUVkYrqjIZSeNIoazNZCsqY4oUmWJBVbQLbQrEvHzPqfP/AFenRPLIZXLn/UOiI+3+m+ve/de6/9PT89jjoP8AXvfuvdKb++u8v7m/6Ov727m/0ff3m/vr/cX+PZX+5v8AfL+FfwP+9v8Adj7r+Cf3m/gn+R/f+D7r7X9rX4/T71pXVqoNVKV86dbqaUrjpM+99a697917r3v3Xuv/1NPz2OOg/wBe9+691737r3Xvfuvde9+691737r3X/9k=');
      background-repeat: no-repeat;
      background-size: cover;
      filter: invert(1);
    }

    .link-white-bold{
      color: #fff;
      margin-top: 20px;
      text-align: left;
      opacity: .8;
      width: 73%;
      font-size: 14px;
    }

    /* Checkbox custom test */

    .checkbox-checkmark {
      position: relative;
      top: 0;
      left: 0;
      height: 22px;
      width: 23px;
      background-color: #fff;
      border: 1px solid #ccc9c9;
      border-radius: 4px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      float: left;
      cursor:pointer;
    }
    
    /* On mouse-over, add a grey background color */
    .checkbox-container:hover input ~ .checkbox-checkmark {
      background-color: #ccc;
    }
    
    /* When the checkbox is checked, add a blue background */
    .checkbox-container input[value="true"] ~ .checkbox-checkmark {
      background-color: #2196F3;
    }
    
    /* Create the checkbox-checkmark/indicator (hidden when not checked) */
    .checkbox-checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }
    
    /* Show the checkbox-checkmark when checked */
    .checkbox-container input[value="true"] ~ .checkbox-checkmark:after {
      display: block;
    }
    
    /* Style the checkbox-checkmark/indicator */
    .checkbox-container .checkbox-checkmark:after {
      left: 8px;
      top: 4px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    .dpnone{
      display:none;
    }
    .dpnone-mobile{
      display:block;
    }
    .dpnone-mobile-flex{
      display:flex;
    }
    span.dpnone-mobile{
      width: 170px;
    }
    .link-text{
      color:#5c85af;
      text-decoration: underline;
    }



    /* Etudier page default search */
    
    .search-page-container{
      background: #F5F5F5;
      min-height:80vh;
      width:100%;
      padding: 45px 30px;
    }

    .search-page-container h1{
      color: #1A202C;
      font-weight:400;
    }
    .search-page-container h1 strong {
      font-weight: bold;
    }

    .search-page-container p{
      color: #777F90;
      max-width:910px;
      margin-bottom:30px;
    }

    .search-page-container .google-places-autocomplete{
      background:#fff;
      border: 2px solid #D3DFEA;
      box-shadow: 0px 0px 8px #18549033;
      border-radius:10px;
    }
    .search-page-container img {
      position: relative;
      width: 40px;
      top: 52px;
      right: 21px;
      float: right;
      margin-top: -40px;
    }

    .search-page-container .google-places-autocomplete input{
      width:100%;
      box-shadow: 0px 0px 0px #fff;
    }
    .search-page-container .google-places-autocomplete .google-places-autocomplete__suggestions-container{
      margin:0;
      width:100%;
    }

    .accordion{
      display:none;
    }

    /* Header user dropdown */
    .user-dropdown{
      cursor:pointer;
      padding-top: 15px;
    }

    .user-dropdown h4, .user-dropdown-avatar{
      display:inline-block;
    }

    .user-dropdown-avatar{
      width:50px;
    }

    .user-dropdown h4 {
      align-self: center;
      padding: 0 0.55rem 0 0;
      font-weight: 600;
      font-size: 1.2rem;
      color: #fff;
    }

    .user-dropdown-avatar span{
      display: inline-block;
      align-self: center;
      border-radius: 50%;
      background: #bdbdbd;
      color: #fff;
      width: 40px;
      height: 40px;
      overflow: hidden;
      position: relative;
      font-size: 1.25rem;
      align-items: center;
      flex-shrink: 0;
      font-family: Upgrade;
      line-height: 2;
      user-select: none;
      border-radius: 50%;
      justify-content: center;
      vertical-align:middle;
      display: flex;
    }

    .user-header-dropdown{
      height: 45px;
    }

    .user-dropdown-menu{
      width: 330px;
      background: #fff;
      box-shadow: 0px 0px 50px 0px rgba(82,63,105,0.15);
      position: fixed;
      right: 15px;
      z-index: 9999999;
    }

    .user-dropdown-menu ul li{
      display: block;
      width: 100%;
      padding: 0.25rem 1.5rem;
      clear: both;
      font-weight: 400;
      color: #74788d;
      text-align: inherit;
      white-space: nowrap;
      background-color: transparent;
      border: 0;
      padding: 20px 10px 20px 25px;
      font-size:1rem;
      color:#000;
      font-weight:500;
      cursor:pointer;
      margin-left:0px;
      transition: all .3s;
    }
    .user-dropdown-menu ul li:hover {
      background:#f7f8fa;
      color:#185490;
    }

    .user-dropdown-menu ul li img{
      position: relative;
      top: -4px;
      vertical-align: middle;
      height: 25px;
      float: right;
      margin-right: 15px;
    }

    .MuiListItemText-primary {
      font-size: 0.875rem !important;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif !important;
      font-weight: 400 !important;
      line-height: 1.43 !important;
      letter-spacing: 0.01071em !important;
      color: rgba(0, 0, 0, 0.54) !important
    }
    .MuiListItemText-secondary {
      color: #185490 !important;
      font-size: 18px !important;
      font-weight: 500 !important;
    }

    .MuiButton-containedPrimary{
      padding: 10px 33px !important;
      border-radius: 7px !important;
      color: #fff !important;
      background-color: #185490 !important;
    }

    .plus-value-pourcent{
      color: #B2DD62;
    }

    .plus-value-moyen{
      color: #185490;
      position: relative;
      left: 41px;
      bottom: 14px;
    }

    .MuiButton-root {
      text-transform: none !important;
  }


`;
