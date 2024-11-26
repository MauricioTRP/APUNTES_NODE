import { EventEmitter } from 'node:events'

/**
 * La clase climatizador debe tener la siguiente interfaz
 * 
 * 1. Sólo puede subir 0.1 grados en cada ejecución de funcion
 */

const DELTA = 0.1

class Climatizador extends EventEmitter {
  constructor(pieza) {
    super()
    this.pieza = pieza
  }

  enfriar() {
    console.log(`Enfriando ${DELTA}°C grados`)
    this.pieza.temperatura -= DELTA
  }
  
  calentar() {
    console.log(`Calentando ${DELTA}°C grados`)
    this.pieza.temperatura += DELTA
  }
}

export { Climatizador }