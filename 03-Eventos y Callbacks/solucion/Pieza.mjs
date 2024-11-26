class Pieza {
  constructor() {
    /**
     * Por conveniencia parte en ésta temperatura
     */
    this.temperatura = 22.1;

    /**
     * Cada 7 segundos sube o baja la temperatura 
     * de manera aleatoria hasta +/- un grado
     */

    setInterval(() => {
      this.temperatura += Math.random() * 2 -1

      console.log(`Cambio aleatoreo de temperatura a ${this.temperatura.toFixed(1)}°C`)
    }, 7000)
  }
}

export { Pieza }