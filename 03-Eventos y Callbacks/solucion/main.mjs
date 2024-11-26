import { Pieza } from "./Pieza.mjs";
import { Climatizador } from "./Climatizador.mjs";
import { Termostato } from "./Termostato.mjs";

const pieza = new Pieza()
const climatizador = new Climatizador(pieza)
const termostato = new Termostato(pieza) 

termostato.on('musho_calors', () => climatizador.enfriar())
termostato.on('musho_frio', () => climatizador.calentar())

termostato.on('temperatura_actual', (temp) => console.log(`Temperatura actual ${temp.toFixed(1)}°C`))

termostato.encender()