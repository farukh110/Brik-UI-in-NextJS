import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/src/theme/Brik';
import { ResetCSS } from 'common/src/assets/css/style';
import { ResponsiveCSS } from 'common/src/assets/css/responsive';
import { GlobalStyle, RegisterWrapper } from 'containers/Brik/brik.style';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'common/src/components/Link';
import { NavbarRight } from 'containers/Brik/Navbar/navbar.style';
import logo from 'common/src/assets/image/brik/logo.png';
import checkmarkicon from 'common/src/assets/image/brik/checkmark.png';
import TagManager from 'react-gtm-module';
import Router from 'next/router';
import config from '../../config';

if (process.browser && process.env.NODE_ENV !== 'development') {
  TagManager.initialize(config.tagManager);
}

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_ROOT_URL}/auth/register`;
const loginUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_ROOT_URL}/auth/login`;

const registerRequest = async (registerParams) => {
  let addCard = {
    firstName: registerParams.name,
    lastName: registerParams.lastname,
    email: registerParams.email
  };

  let params = {
    email: registerParams.email,
    password: registerParams.password,
    Entity: registerParams.Entity,
    UserCard: addCard,
    cguAccepted: registerParams.cguAccepted
  };
  const data = await axios
    .post(`${baseUrl}`, params, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic YnJpazpAYnIxaw==' // TODO : Remove this, this is used for htaccess login.
      }
    })
    .catch(function () {});
  return data;
};

const loginRequest = async ({ email, password }) => {
  return axios.post(
    loginUrl,
    {
      email,
      password,
      method: 'standard'
    },
    {
      withCredentials: true
    }
  );
};

const Register = () => {
  const [loginSuccess, setLoginSuccess] = useState(0);
  const [registerBtnEnabled, setRegisterBtnEnabled] = useState(false);

  // Formik init
  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      Entity: { type: 'physical' },
      cguAccepted: false
    },
    onSubmit: (values) => {
      TagManager.dataLayer({
        dataLayer: {
          event: 'gaEvent',
          eventCategory: 'Compte',
          eventAction: 'Création',
          eventLabel: 'Register'
        }
      });
      if (!values.cguAccepted) {
        setLoginSuccess(3);
        return;
      }
      setRegisterBtnEnabled(true);
      registerRequest(values).then(async (res) => {
        if (res) {
          if (process.browser) {
            await loginRequest(values);
            setLoginSuccess(1);
            if (process.env.NODE_ENV !== 'production') {
              Router.push(`${process.env.NEXT_PUBLIC_WEBAPP_URL}`);
            } else {
              // Disable this once management is done
              let currLocation = window.location.href;
              window.location.href = currLocation.replace('/register', '/');
            }
          }
        } else {
          setLoginSuccess(2);
        }
        setRegisterBtnEnabled(false);
      });
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <title>Brik | Inscription</title>
          <meta name="theme-color" content="#185490" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

          <meta name="Description" content="Connexion à l'application Brik" />

          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ResetCSS />
        <ResponsiveCSS />
        <GlobalStyle />
        <RegisterWrapper>
          <div className="login-header">
            <NavbarRight>
              <li>
                <Link href="/" className="menu-goback-btn">
                  <span className="glyph-icon flaticon-plus-symbol" />
                </Link>
              </li>
            </NavbarRight>
          </div>

          <div className="register-left">
            <img src={logo} alt="Logo brik"></img>

            <div className="register-left-features">
              <h1>
                Créer un <strong>compte gratuit</strong> sur <br /> Brik vous permettra de :
              </h1>

              <ul>
                <li>
                  <img src={checkmarkicon} className="checkmark-icon" />{' '}
                  <p>
                    <strong>Analyser</strong> un secteur en vue d’un achat
                  </p>
                </li>

                <li>
                  <img src={checkmarkicon} className="checkmark-icon" />{' '}
                  <p>
                    <strong>Étudier</strong> un quartier pour un investissement sûr
                  </p>
                </li>

                <li>
                  <img src={checkmarkicon} className="checkmark-icon" />{' '}
                  <p>
                    <strong>Vérifier</strong> la valeur de votre bien avant de le proposer à la vente
                  </p>
                </li>

                <li>
                  <img src={checkmarkicon} className="checkmark-icon" />{' '}
                  <p>
                    <strong>Recevoir </strong>
                    des alertes de l’activité immobilière autour de chez vous
                  </p>
                </li>

                <li>
                  <img src={checkmarkicon} className="checkmark-icon" />{' '}
                  <p>
                    <strong>Et plein</strong> d’autres choses …
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="register-form">
            <h1>
              Créer <strong>votre compte</strong>
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-field">
                <span>prénom</span>
                <input
                  id="name"
                  name="name"
                  type="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  autoComplete="none"
                />
              </div>

              <div className="form-field">
                <span>nom</span>
                <input
                  id="lastname"
                  name="lastname"
                  type="lastname"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  autoComplete="none"
                />
              </div>

              <div className="form-field fwidth">
                <span>adresse email</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  autoComplete="none"
                />
              </div>

              <div className="form-field fwidth">
                <span>Mot de passe</span>
                <input
                  className="password-field"
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  autoComplete="none"
                />
              </div>

              <div className="form-field fwidth">
                <span>Confirmez mot de passe</span>
                <input className="password-field" type="password" />
              </div>

              <div className="form-field fwidth">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    className="dpnone"
                    name="cguAccepted"
                    value={formik.values.cguAccepted}
                    onChange={formik.handleChange}
                    checked={formik.values.cguAccepted}
                  ></input>
                  <div className="checkbox-checkmark"></div>
                </label>
                <p className="cgu-label">J'accepte que mes données soient stockées sur les serveurs de Brik.</p>
              </div>

              <button type="submit" className="btn-blue" disabled={registerBtnEnabled}>
                Créer mon compte
              </button>
            </form>

            {loginSuccess == 1 && <div className="login-success">Inscription réussie. Redirection...</div>}

            {loginSuccess == 2 && <div className="login-failed">email incorrect ou déjà utilisé.</div>}

            {loginSuccess == 3 && <div className="login-failed">Veuillez accepter les conditions d'utilisations</div>}

            <Link href={'/login'}>
              <p>
                <span className="lite-text">Vous avez déjà un compte ?</span>{' '}
                <span className="link-text">Connectez-vous</span>
              </p>
            </Link>
          </div>
        </RegisterWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export default Register;
