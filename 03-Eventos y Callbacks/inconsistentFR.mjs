/**
 * Uso de función "mitad" sincrónica "mitad" async
 * para lectura y caché de archivos
 */

import { readFile } from 'fs'

const cache = new Map()

function lectorInconsistente(filename, cb) {
  if (cache.has(filename)) {
    // función sincrónica
    cb(cache.get(filename))
  } else {
    // función asincrónica
    readFile(filename, 'utf8', (err, data) => {
      cache.set(filename, data)
      cb(data)
    })
  }
}

function crearLectorArchivos (filename) {
  const listeners = []

  lectorInconsistente(filename, valor => {
    listeners.forEach(listener => listener(valor))
  })

  return {
    onDataReady: listener => listeners.push(listener)
  }
}

const lector1 = crearLectorArchivos('./dummy/data.txt')

lector1.onDataReady(data => {
  console.log(`Primer listener con data: ${data}`)

  // Seguimos operando dentro de éste lector:
  // Después de un rato tratamos de leer nuevamente el mismo archivo.

  const lector2= crearLectorArchivos('./dummy/data.txt')

  lector2.onDataReady(data => {
    console.log(`Segundo listener con data: ${data}`)
  })
})