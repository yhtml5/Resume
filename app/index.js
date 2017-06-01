import 'github-markdown-css'
import './Components/index.css'
import './Components/Header.css'
import './Components/Footer.css'
import { yhtml5 } from '../build/template/author'
import image from './static/yhtml5.png'

console.log(image)

yhtml5()

// if (process.env.NODE_ENV === 'production') {
//   setInterval(author.yhtml5(), 3000)
// }
