import * as Sentry from '@sentry/browser';
import { ResetCSS } from 'common/src/assets/css/style';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
class Error extends React.Component {
  static async getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    Sentry.captureException(err, res);
    await Sentry.flush(2000);
    return { statusCode };
  }

  async componentDidMount() {
    if (process.browser && Router) {
      Router.push('/');
    } else {
      Sentry.captureException(new Error(`_error.js getInitialProps missing data at path: ${asPath}`));
      await Sentry.flush(2000);
    }
  }

  render() {
    return (
      <>
        <Head>
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <title>404: Not found</title>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:400,700|Poppins:400,500,600,700|Roboto:400,500,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ResetCSS />
      </>
    );
  }
}

export default Error;
