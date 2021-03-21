import axios from 'axios';
import { ResetCSS } from 'common/src/assets/css/style';
import logo from 'common/src/assets/image/brik/logo.png';
import Link from 'common/src/components/Link';
import { useQuery } from 'common/src/hooks/useQuery';
import { theme } from 'common/src/theme/Brik';
import { GlobalStyle, LoginWrapper } from 'containers/Brik/brik.style';
import { NavbarRight } from 'containers/Brik/Navbar/navbar.style';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';
import { ThemeProvider } from 'styled-components';
import config from '../../config';

if (process.browser && process.env.NODE_ENV !== 'development') {
  TagManager.initialize(config.TagManager);
}

const translations = {
  NO_TOKEN: 'Le token de réinitialisation est introuvable.'
};

// Routes
const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_ROOT_URL}/mail/confirm`;
// Fetch
const resetRequest = (setResponseStatus) => async (token) => {
  try {
    await axios.get(`${baseUrl}?token=${token}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic YnJpazpAYnIxaw==' // TODO : Remove this, this is used for htaccess login.
      }
    });
    setResponseStatus({
      code: 1,
      message: `Votre adresse email a bien été confirmée.`
    });
  } catch (error) {
    setResponseStatus({
      code: 2,
      message: "Le token que vous avez renseigné n'existe pas."
    });
  }
};

const ResetPassword = () => {
  const query = useQuery();
  const router = useRouter();
  const [requestStatus, setRequestStatus] = useState({
    code: 0,
    message: ''
  });
  const request = resetRequest(setRequestStatus);

  useEffect(() => {
    let timeout;
    if (!query.token) {
      router.push('/');
    } else if (requestStatus.code === 0) {
      request(query.token);
    } else if (requestStatus.code === 1) {
      timeout = setTimeout(() => router.push('/'), 5000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [requestStatus, router, query]);

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

            <h1>Confirmation d'email</h1>
            {query.token && requestStatus.code === 0 && <p>Validation de votre email en cours...</p>}

            {requestStatus.code !== 0 && (
              <div className={requestStatus.code === 1 ? 'login-success' : 'login-failed'}>
                {translations[requestStatus.message] || requestStatus.message}
              </div>
            )}
          </div>
        </LoginWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export default ResetPassword;
