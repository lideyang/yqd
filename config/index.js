'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: '',
    assetsPublicPath: '/dist/vue/',
    proxyTable: {
      '/api/*': {
        target: 'http://127.0.0.1:' + Number(process.env.VUE_PORT)? Number(process.env.VUE_PORT)+ 1000:2070,
        secure: false
      },
      '/test': {
        //target: 'http://127.0.0.1:8480',
        target: "http://mcg.yiqiandai.com",
        pathRewrite: {'^/test': ''},
        //ignorePath: true,
        secure: false,
        changeOrigin: true,
        logLevel: "debug"
      },
      // '*': {
      //   target: 'http://mcg.yiqiandai.com',
      //   secure: false,
      //   changeOrigin: true,
      //   logLevel: "debug"
      // },
      // '/spa/*': {
      //   target: 'http://127.0.0.1:8480',
      //   secure: false
      // },
      // '*': {
      //   target: 'http://127.0.0.1:8480',
      //   secure: false
      // }
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: Number(process.env.VUE_PORT) || 3001, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    mockPort: Number(process.env.VUE_PORT)? Number(process.env.VUE_PORT)+ 1000:2070,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../page/app.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist/vue'),
    assetsSubDirectory: '',
    assetsPublicPath: '/dist/vue/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
