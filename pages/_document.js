import Document, { Head, Main, NextScript, Html } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/core';

import FavIcon from 'common/src/assets/image/favicon.png';

import * as Sentry from '@sentry/browser';

process.on('unhandledRejection', (err) => {
  Sentry.captureException(err);
});

process.on('uncaughtException', (err) => {
  Sentry.captureException(err);
});

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentsSheet = new ServerStyleSheet();
    const materialSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props} />))
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <React.Fragment key="styles">
            {initialProps.styles}
            {materialSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </React.Fragment>
        )
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }
  render() {
    return (
      <Html lang="fr">
        <Head>
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <link rel="shortcut icon" type="image/x-icon" href={FavIcon} />
          <script src="https://apis.google.com/js/platform.js"></script>
          {process.env.NEXT_PUBLIC_ENV === 'prod' && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="341ad63b-d439-43d4-89ef-215839634275";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`
              }}
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
