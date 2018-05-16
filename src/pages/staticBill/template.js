const meta = require('../meta.html')
const noscript = require('../noscript.html')
const markdown = require('./README.md')
const header = require('./Header.html')
const footer = require('../../Components/Footer.html')

const html = (templateParams) =>
  `<!DOCTYPE html>
    <html>
      <head>
        ${meta}
        <title>${templateParams.htmlWebpackPlugin.options.title}</title>
      </head>
      <body>
        ${noscript}
        ${header}
        <div id='body' class="main-content">
          ${markdown}
          ${footer}
        </div>
        <!--<div>development mode</div>-->
      </body>
    </html>`

module.exports = html
