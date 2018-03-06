import 'github-markdown-css'
import '../../Components/index.css'
import '../../Components/Header.css'
import '../../Components/Footer.css'
import '../../Components/print.internal.css'

function setTarget() {
  var as = document.getElementsByTagName('a')
  for (var i = 0; i < as.length; i++)
    as[i].setAttribute('target', 'blank')
}

setTarget()

window.appEnv = process.env

console.warn('index',appEnv)
