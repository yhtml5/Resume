import 'github-markdown-css'
import './Components/index.css'
import './Components/print.css'
import './Components/Header.css'
import './Components/Footer.css'
import { yhtml5 } from '../build/template/author'

yhtml5()

  (function () {
    var as = document.getElementsByTagName('a')
    for (i = 0; i < as.length; i++)
      as[i].setAttribute('target','blank')
  })()



// if (process.env.NODE_ENV === 'production') {
//   setInterval(author.yhtml5(), 3000)
// }
