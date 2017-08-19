// Config.js must be in the same directory as node_moudle

const config = {
  entry: 'src/index.js',
  devPort: 9991,
  analyzerPort: 9992,
  distributePort: 9993,
  pages: [{
    title: '测试1',
    key: 'index',
    filename: 'index.html',
    path: 'src/pages/resume.js'
  }, {
    key: 'luyan',
    title: '测试2',
    filename: 'luyan.html',
    path: 'src/pages/luyan.js'
  }],
  output: '/',
  type: '',
  templateHtml: 'src/pages/template.js',
}

module.exports = config