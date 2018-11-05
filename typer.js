const endOfSentence = /[\.\?\!\。\？\！]\s$/
const comma = /(\D[\,])|(.\，)\s$/
const endOfBlock = /[^\/]\n\n$/

class Typer {
  
  constructor ({interval = 10}) {
    this.interval = interval
    this.fullText = ''
    this.paused = false
  }

  delay (ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, ms)
    })
  }

  async type (element, text, index = 0) {
    let chars
    let multi = false
    const multiType = /\[(.*?)\]/

    if (/\[/.test(text.charAt(index))) {
      chars = text.slice(index).match(multiType)[0]
      multi = true
    } else {
      chars = text.charAt(index)
    }
    
    element.scrollTop = element.scrollHeight


    if (multi) {
      this.fullText += chars.replace(multiType, (match, p1) => {
        return p1
      })
    } else {
      this.fullText += chars
    }

    element.innerHTML = this.fullText

    let thisInterval = this.interval
    let thisSlice = text.slice(index - 1, index + 2);
    if (multi) {
      thisInterval = this.interval * 5
    } else {
      if (comma.test(thisSlice)) {
        thisInterval = this.interval * 3
      }
      if (endOfBlock.test(thisSlice)) {
        thisInterval = this.interval * 7
      }
      if (endOfSentence.test(thisSlice)) {
        thisInterval = this.interval * 5
      }
    }

    do {
      await this.delay(thisInterval)
    } while(this.paused)

    index += chars.length
    if (index < text.length) {
      return this.type(element, text, index)
    }
  }
}

export default Typer