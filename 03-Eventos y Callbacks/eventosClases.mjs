import { EventEmitter } from 'node:events'
import { readFile } from 'node:fs'

class FindRegex extends EventEmitter {
  constructor(regex) {
    super()
    this.regex = regex
    this.files = []
  }

  addFile (file) {
    this.files.push(file)
    return this // retorna instancia para poder encadenar métodos
  }

  find() {
    for(const file of this.files) {
      readFile(file, 'utf8', (error, content) => {
        if(error) {
          return this.emit('error', error) // emite error para manejar con CB
        }

        this.emit('fileread', file)
        const match = content.match(this.regex)

        if(match) {
          match.forEach(elem => this.emit('found', file, elem))
        }
      })
    }
    return this // retorna instancia para poder encadenar métodos
  }
}

const findRegexInstance = new FindRegex(/radiation/gi)

findRegexInstance
  .addFile('./dummy/lorem1.txt')
  .addFile('./dummy/lorem.json')
  .find()
  .on('found', (file, match) => console.log(`Match ${match} en archivo ${file}`))
  .on('error', err => console.error(`Error emitido ${err.message}`))
