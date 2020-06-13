const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const getTemplate = require('../public/resume.template')

// const template = getTemplate({
//   hasHeader: true,
//   hasFooter: true,
//   content: require('../src2/pages/yhtml5/README.md'),
// })

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    resume: './src2/index.js',
  },
  output: {
    filename: 'index.js',
    path: 'dist2',
  },
  module: {
    rules: [{
      test: /\.md$/,
      use: [
        {
          loader: "html-loader"
        },
        {
          loader: "markdown-loader",
          options: {
            /* your options here */
          }
        }
      ]
    }, {
      test: /\.jsx?$/,
      include: [
        './src2'
      ],
      exclude: [
        'node_modules'
      ],
      loader: "babel-loader",
      options: {
        presets: ["es2015"]
      },
    },]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '前端开发 | 张大漾',
      // filename: 'assets/admin.html',
      template: '../public/index.html',
    }),
  ],
}
