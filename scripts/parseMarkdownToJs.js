const fs = require('fs')
const path = require('path')

const resolveApp = v => path.resolve(__dirname, v)
const markdown = fs.readFileSync(resolveApp('../src/pages/yhtml5/README.md'))
const targetDir = resolveApp('../ignore/wemark/demo/index/')

function formatMarkdown(markdown) {
  const commentOpenExpression = /<!--/
  const commentCloseExpression = /-->/
  const string = String(markdown)
    // 兼容 `
    .replace(/`/g, '\\`')
    // 删除 注释
    .split(commentOpenExpression)
    .map(v => commentCloseExpression.test(v)
      ? v.split(commentCloseExpression)[1]
      : v)
    .join('')
  return string
}

const content = `module.exports =\`\n${formatMarkdown(markdown)}\n\``

// console.log(Object.prototype.toString(resume), String(resume))
fs.writeFileSync(path.join(targetDir, 'resume.md.js'), content)


// const str = 'hello ${1}'
// const MAP = {
//     1: 'world',
// }
// str.replace(/\<\!--(w+)()--\>/g, function(test, key, b) {
//     return MAP[key] || ''
// })
// '<!--aaaaaa-->'.replace(/\<\!--(w+)()--\>/g, function(test, key, b) {
// })
