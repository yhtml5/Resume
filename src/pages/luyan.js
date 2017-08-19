const markdown = require('./luyan.md')
// const header = require('../Components/Header.html')
const footer = require('../Components/Footer.html')

function html() {
  return (
    `
    <div id='body' class="main-content">
    ${markdown}
    ${footer}
    </div>
    `
  )
}

module.exports = html()