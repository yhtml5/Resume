import 'github-markdown-css'
import './Components/index.css'
import './Components/print.css'
import './Components/Header.css'
import './Components/Footer.css'
import { yhtml5 } from '../build/template/author'

yhtml5()

// if (process.env.NODE_ENV === 'production') {
//   setInterval(author.yhtml5(), 3000)
// }
