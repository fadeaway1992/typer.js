import Typer from './typer.js'
import text from 'raw-loader!./profile.txt'
console.log(text)

const typer = new Typer({interval: 0.2})
const typeContainer = document.querySelector('.type-container')

document.querySelector('.pause').addEventListener('click', () => {
  typer.pauseOrResume()
})
document.querySelector('.speedup').addEventListener('click', () => {
  typer.speedUp()
})
document.querySelector('.speeddown').addEventListener('click', () => {
  typer.speedDown()
})

typer.type(typeContainer, text)