import 'github-markdown-css'
import '../../Components/index.css'
import '../../Components/print.internal.css'
import '../../Components/Footer.css'

function setTarget() {
  var as = document.getElementsByTagName('a')
  for (var i = 0; i < as.length; i++)
    as[i].setAttribute('target', 'blank')
}

setTarget()

window.appEnv = process.env

console.warn('luyan')
