import Typer from './typer.js'
import text from 'raw-loader!./profile.txt'
console.log(text)

const typer = new Typer({interval: 100})
const typeContainer = document.querySelector('.type-container')
typer.type(typeContainer, text)