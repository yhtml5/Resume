/**
 * Author: yhtml5
 * Description: The configuration file for the yhtml5-scripts should not be packaged into the app
 * Notice: when this file changes, you should rerunning scripts
 */
const packageJson = require('./package.json')
const { getVersion } = require('yhtml5-dev-utils')
const outputPath = `dist/${getVersion(packageJson.version)}`

const envVar = {
  base: {
    APP_TITLE: 'SPA'
  },
  development: {
    customNodeEnv: 'development',
    fileBaseUrl: '../../file',
    shareApiBaeUrl: 'http://api.l.whereask.com',
    gatewayApiBase: '//gateway.2dfire-daily.com',
    gatewayApiEnv: '13cccf8b7b58467da82163d3cf540ef7'
  },
  production: {
    customNodeEnv: 'production',
    fileBaseUrl: '../../file',
    shareApiBaeUrl: 'http://api.l.whereask.com',
    gatewayApiBase: '//gateway.2dfire-daily.com',
    gatewayApiEnv: '13cccf8b7b58467da82163d3cf540ef7'
  }
};

const config = {
  devHost: '0.0.0.0',
  devPort: 9991,
  isAnalyze: true,
  analyzerPort: 9992,
  envVar: envVar,
  outputPath: outputPath,
  // host: './',
  entry: 'src/index.js',
  type: 'MPA',
  pages: [{
    title: '前端开发丨张大漾',
    entry: 'src/index.js',
    template: 'src/pages/index.js'
  }, {
    title: '网页设计丨卢燕',
    entry: 'src/luyan.js',
    template: 'src/pages/luyan.js'
  }],
  // distributePort: 9993,
  test: {
    // testMatch: ['demo/__test__/**/*.js?(x)'],
    // transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|react-redux|react-native-button)/)"],
    // moduleNameMapper: webpackConfigAlias,
    // collectCoverageFrom: ['src/**/*.{js,jsx}'],
  }
}

module.exports = config

