import { EventEmitter } from 'node:events'
import { readFile } from 'node:fs'

function findRegex (files, regex) {
  const emitter = new EventEmitter()

  for(const file of files) {
    readFile(file, 'utf8', (err, content) => {
      if(err) {
        return emitter.emit('error', err)
      }

      emitter.emit('fileread', file)
      const match = content.match(regex)
      if (match) {
        match.forEach(elem => emitter.emit('found', file, elem))
      }
    })
  }

  return emitter
}

findRegex(['./dummy/lorem1.txt', './dummy/lorem.json'], /radiation/ig)
  .on('fileread', file => console.log(`${file} fue leída`))
  .on('found', (file, match) => console.log(`Encontró un match "${match}" en ${file}`))
  .on('error', err => console.error(`Error emitido ${err.message}`))