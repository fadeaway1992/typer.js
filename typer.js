const endOfSentence = /[\.\?\!\。\？\！]$/
const comma = /(\D[\,])|(.\，)$/

class Typer {
  
  constructor ({interval = 0.1}) {
    this.interval = interval * 1000
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
    const multiType = /\[(.*?)(delay(\d+))?\]/
    const deleteChars = /\[-(\d+)(delay(\d+))?\]/
    let customDelay = false

    if (/\[/.test(text.charAt(index))) {
      chars = text.slice(index).match(multiType)[0]
      multi = true
    } else {
      chars = text.charAt(index)
    }
    
    element.scrollTop = element.scrollHeight


    if (multi) {
      let deleteArray = deleteChars.exec(chars)
      if (deleteArray) {
        this.fullText = this.fullText.slice(0, -deleteArray[1])
        if (deleteArray[3]) {
          customDelay = deleteArray[3] * 1000
        }
      } else {
        this.fullText += chars.replace(multiType, (match, p1, p2, p3) => {
          if (p3) {
            customDelay = p3 * 1000
          }
          return p1
        })
      }
    } else {
      this.fullText += chars
    }

    element.innerHTML = this.fullText

    let thisInterval = this.interval
    let thisSlice = text.slice(index - 1, index + 1);
    if (multi) {
      thisInterval = customDelay || this.interval
    } else {
      if (comma.test(thisSlice)) {
        thisInterval = this.interval * 3
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

  pauseOrResume () {
    this.paused = !this.paused
  }
  
  changeInterVal (interval) {
    this.interval = interval * 1000
  }

  speedUp () {
    this.interval  = this.interval * 0.8
  }

  speedDown () {
    this.interval = this.interval * 1.2
  }
}

export default Typer