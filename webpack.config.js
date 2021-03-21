const SentryWebpackPlugin = require('@sentry/webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new SentryWebpackPlugin({
        // sentry-cli configuration
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: 'brik-immo',
        project: 'landing',

        // webpack specific configuration
        include: '.',
        ignore: ['node_modules', 'webpack.config.js']
      })
    ]
  }
};
