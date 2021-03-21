import axios from 'axios';
import { ResponsiveCSS } from 'common/src/assets/css/responsive';
import { ResetCSS } from 'common/src/assets/css/style';
import eye from 'common/src/assets/image/brik/eye.png';
import logo from 'common/src/assets/image/brik/logo.png';
import Link from 'common/src/components/Link';
import { theme } from 'common/src/theme/Brik';
import { GlobalStyle, LoginWrapper } from 'containers/Brik/brik.style';
import { NavbarRight } from 'containers/Brik/Navbar/navbar.style';
import { useFormik } from 'formik';
import Head from 'next/head';
import Router from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';
import { ThemeProvider } from 'styled-components';
import config from '../../config';

if (process.browser) {
  TagManager.initialize(config.tagManager);
}

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_ROOT_URL}/auth/login`;

const loginRequest = async (loginParams) => {
  const data = await axios
    .post(`${baseUrl}`, loginParams, {
      withCredentials: true
    })
    .catch(function () {});
  return data;
};

const onSignIn = (setLoginSuccess) => (googleUser) => {
  const googleToken = googleUser.getAuthResponse().id_token;
  loginRequest({
    method: 'google',
    googleToken
  })
    .then((res) => {
      if (res) {
        Router.push('/management');
        setLoginSuccess(1);
        return;
      }
      setLoginSuccess(2);
    })
    .catch((error) => {
      console.error(error);
    });
};

function attachSignin(elementId, auth2, setLoginSuccess) {
  auth2.attachClickHandler(document.getElementById(elementId), {}, onSignIn(setLoginSuccess), (error) =>
    console.error(error)
  );
}

const Login = () => {
  const [loginSuccess, setLoginSuccess] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      method: 'standard',
      stayConnected: false
    },
    onSubmit: (values) => {
      loginRequest(values).then((res) => {
        if (res) {
          if (process.browser) {
            setLoginSuccess(1);
            let currLocation = window.location.href;
            window.location.href = currLocation.replace('/login', '/');
          }
        } else {
          setLoginSuccess(2);
        }
      });
    }
  });

  useEffect(() => {
    window.gapi.load('auth2', () => {
      const auth2 = window.gapi.auth2.init({
        client_id: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin'
      });

      attachSignin('googleSignIn', auth2, setLoginSuccess);
    });
  }, [setLoginSuccess]);

  const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <title>Brik | Connexion</title>
          <meta name="theme-color" content="#185490" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          <meta name="Description" content="Connexion à l'application Brik" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ResetCSS />
        <ResponsiveCSS />
        <GlobalStyle />
        <LoginWrapper>
          <div className="login-header">
            <Link href="/" className="back-button">
              <img src={logo} alt="Logo brik"></img>
            </Link>

            <NavbarRight className="login-page-header-btns">
              <li>
                <Link href="/" className="menu-goback-btn goback-light">
                  <span className="glyph-icon flaticon-plus-symbol" />
                </Link>
              </li>
            </NavbarRight>
          </div>

          <div className="login-content">
            <div className="login-content-left">
              <h1>Connectez-vous</h1>

              <div className="login-form">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-field login-width">
                    <span htmlFor="email">Adresse email</span>
                    <input
                      className="field-login"
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </div>
                  <div className="form-field login-width has-relative-child">
                    <span htmlFor="password">Mot de passe</span>
                    <input
                      className="field-login"
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <i className="password-show-btn" onClick={togglePasswordVisiblity}>
                      <img src={eye} />
                    </i>
                  </div>

                  <div className="form-field login-width">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        className="dpnone"
                        name="stayConnected"
                        value={formik.values.stayConnected}
                        onChange={formik.handleChange}
                      />
                      <div className="checkbox-checkmark"></div>
                    </label>
                    <p className="stay-connected-label">Rester connecté</p>
                  </div>

                  <button type="submit" className="btn-blue">
                    Se connecter
                  </button>

                  <span className="sm-text">
                    <Link href="/resetpassword" className="link-white-bold" id={'forgotPasswordButton'}>
                      Mot de passe oublié ?
                    </Link>
                  </span>

                  <div className="horizontal-divider"> OU </div>

                  <button
                    type={'submit'}
                    className="btn-red"
                    id="googleSignIn"
                    onClick={function (e) {
                      e.preventDefault();
                    }}
                  >
                    Google
                  </button>
                </form>

                {loginSuccess == 1 && <div className="login-success">Connexion réussie. Redirection...</div>}

                {loginSuccess == 2 && <div className="login-failed">Les identifiants sont invalides.</div>}
              </div>
            </div>

            <div className="vl"></div>

            <div className="login-content-right">
              <h1>
                Pas encore de <br /> compte ?
              </h1>

              <Link href="/register" className="menu-register-btn">
                <span className="glyph-icon flaticon-user" /> Créer un compte <strong>gratuit</strong>
              </Link>
            </div>
          </div>
        </LoginWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export default Login;
