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
    APP_TITLE: 'MPA'
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
  // entry: 'src/index.js',
  type: 'MPA',
  pages: [{
    key: 'index',
    title: '前端开发丨张大漾',
    entry: 'src/pages/yhtml5/index.js',
    template: 'src/pages/yhtml5/template.js',
    inlineSource: '.(js|css)$'
  }, {
    key: 'luyan',
    title: '网页设计丨卢燕',
    entry: 'src/pages/luyan/index.js',
    template: 'src/pages/luyan/template.js',
    inlineSource: '.(js|css)$'
  }, {
    key: 'report',
    title: 'H5内嵌小程序调研报告',
    entry: 'src/pages/h5MinProgramReport/index.js',
    template: 'src/pages/h5MinProgramReport/template.js',
    inlineSource: '.(js|css)$'
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

