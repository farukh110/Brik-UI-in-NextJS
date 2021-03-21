import axios from 'axios';
import { ResetCSS } from 'common/src/assets/css/style';
import logo from 'common/src/assets/image/brik/logo.png';
import Link from 'common/src/components/Link';
import { useQuery } from 'common/src/hooks/useQuery';
import { theme } from 'common/src/theme/Brik';
import { GlobalStyle, LoginWrapper } from 'containers/Brik/brik.style';
import { NavbarRight } from 'containers/Brik/Navbar/navbar.style';
import { useFormik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';
import { ThemeProvider } from 'styled-components';
import config from '../../config';

if (process.browser && process.env.NODE_ENV !== 'development') {
  TagManager.initialize(config.tagManager);
}

const translations = {
  NO_TOKEN: 'Le token de réinitialisation est introuvable.'
};

// Routes
const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_ROOT_URL}/auth/forgot-password`;
const resetPasswordURL = `${process.env.NEXT_PUBLIC_BACKEND_API_ROOT_URL}/auth/change-password`;
// Fetch
const resetRequest = (setLoginStatus) => async ({ email, password, confirmPassword }, token) => {
  if (!token) {
    try {
      await axios.post(
        baseUrl,
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic YnJpazpAYnIxaw==' // TODO : Remove this, this is used for htaccess login.
          }
        }
      );
      setLoginStatus({ code: 1, message: `Un mail a été envoyé à ${email}` });
    } catch (error) {
      setLoginStatus({
        code: 2,
        message: "Le mail renseigné n'existe pas."
      });
    }
  } else {
    try {
      await axios.post(
        resetPasswordURL,
        { password, confirmPassword, token },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic YnJpazpAYnIxaw==' // TODO : Remove this, this is used for htaccess login.
          }
        }
      );
      setLoginStatus({
        code: 1,
        message: 'Votre nouveau mot de passe a bien été enregistré'
      });
    } catch (error) {
      setLoginStatus({
        code: 2,
        message: error?.response?.data || "Impossible d'appliquer le nouveau mot de passe."
      });
    }
  }
};

const ResetPassword = () => {
  const query = useQuery();
  const router = useRouter();
  const [requestStatus, setLoginSuccess] = useState({
    code: 0,
    message: ''
  });
  const request = resetRequest(setLoginSuccess);
  // Formik init
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: (values) => {
      request(values, query?.token).then(() => {});
    },
    validate: (values) => {
      const errors = {};
      if (query.token) {
        if (!values.password) {
          errors['password'] = 'Le mot de passe doit être renseigné';
        }
        if (!values.confirmPassword) {
          errors['confirmPassword'] = 'La confirmation de mot de passe doit être renseignée';
        }

        if (values.password && values.confirmPassword && values.confirmPassword !== values.password) {
          errors['confirmPassword'] = 'Les mots de passe doivent être identiques.';
        }
      }

      return errors;
    }
  });

  useEffect(() => {
    let timeout;
    if (requestStatus.code === 1) {
      timeout = setTimeout(() => router.push('/'), 2000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [requestStatus, router]);

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <title>Brik | Connexion</title>
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
        <GlobalStyle />
        <LoginWrapper>
          <div className="login-header">
            <Link href="/" className="back-button">
              <span className="glyph-icon flaticon-left-arrow" />
              Retour
            </Link>

            <NavbarRight>
              <li>
                <Link href="/login">Connexion</Link>
              </li>
              <li>
                <Link href="/register" className="menu-register-btn">
                  <span className="glyph-icon flaticon-user" /> Créer un compte <strong>gratuit</strong>
                </Link>
              </li>
            </NavbarRight>
          </div>

          <div className="login-content">
            <img src={logo} alt="Logo brik"></img>

            <h1>Oublie de mot de passe</h1>
            {!query.token && (
              <p>Entrez votre email et nous vous enverrons un lien vous permettant de changer votre mot de passe.</p>
            )}
            {query.token && <p>Saisissez et confirmez votre nouveau mot de passe.</p>}

            {!!Object.keys(formik.errors).length &&
              Object.keys(formik.errors).map((field) => <p className="error">{formik.errors[field]}</p>)}

            <div className="login-form">
              <form onSubmit={formik.handleSubmit}>
                {!query.token && (
                  <div className="form-field fwidth">
                    <span htmlFor="email">Email</span>
                    <input
                      className="field-login"
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </div>
                )}
                {query.token && (
                  <>
                    <div className="form-field fwidth">
                      <span htmlFor="password">Mot de passe</span>
                      <input
                        className="field-login"
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        touched={formik.touched.password}
                      />
                    </div>
                    <div className="form-field fwidth">
                      <span htmlFor="confirmPassword">Confirmer le mot de passe</span>
                      <input
                        className="field-login"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        touched={formik.touched.confirmPassword}
                      />
                    </div>
                  </>
                )}
                <button type="submit" className="btn-blue">
                  Valider
                </button>
              </form>
              {requestStatus.code !== 0 && (
                <div className={requestStatus.code === 1 ? 'login-success' : 'login-failed'}>
                  {translations[requestStatus.message] || requestStatus.message}
                </div>
              )}
            </div>
          </div>
        </LoginWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export default ResetPassword;
