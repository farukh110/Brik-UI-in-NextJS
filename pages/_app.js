import React, { Fragment, useEffect } from 'react';
import { Modal } from '@redq/reuse-modal';
import '@redq/reuse-modal/es/index.css';
import { wrapper } from 'store/store';
import * as Sentry from '@sentry/browser';
import config from '../config';

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    import('react-facebook-pixel')
      .then((module) => module.default)
      .then((ReactPixel) => {
        ReactPixel.init(config.facebookPixelId);
        ReactPixel.pageView();
      });
    import('react-linkedin-insight')
      .then((module) => module.default)
      .then((LinkedInTag) => {
        LinkedInTag.init(config.linkedInTag, 'dc', false);
      });
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Modal />
      <Component {...pageProps} />
    </Fragment>
  );
};

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: true,
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN
  });
}

export default wrapper.withRedux(App);
