import {EventEmitter} from 'node:events'

// Aceptamos un margen de error de 0.3 grados antes de enviar el evento
const MARGEN_ERROR = 0.3;

class Termostato extends EventEmitter {
  constructor(pieza) {
    super()
    this.temperatura_ideal = 22
    this.pieza = pieza

    // proceso intervalo
    this.intervalId = null
  }

  encender () {
    console.log(`Encendiendo termostato`)
    clearInterval(this.intervalId)
    this.intervalId = setInterval(() => {
      this.emit('temperatura_actual', this.pieza.temperatura)

      if(this.pieza.temperatura >= this.temperatura_ideal + MARGEN_ERROR) {
        this.emit('musho_calors')
      } else if (this.pieza.temperatura <= this.temperatura_ideal - MARGEN_ERROR) {
        this.emit('musho_frio')
      }
    }, 3000)
  }

  apagar () {
    console.log(`Apagando termostato`)
    clearInterval(this.intervalId)
  }
}

export { Termostato }