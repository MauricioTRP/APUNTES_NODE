# Testing

Cuando testeamos aplicaciones, sabemos que existen elementos de ella que serán **invariantes**, es decir, que cada vez que ejecutemos esa pieza de código, el resultado siempre será el mismo.

Para que podamos validar el comportamiento de estas piezas de código es que utilizamos herramientas de **aserciones**, donde validamos distintos escenarios para estos bloques en particular.

Node trae su propia librería de aserciones `assert`, pero en nuestro caso decantaremos por el uso de [`Jest`][jest], librería ampliamente utilizada en los entornos JavaScript para testing de aplicaciones tanto BackEnd, FrontEnd como FullStack.

## TDD - BDD

Imaginemos que te piden la construcción de una calculadora con un interfaz a medida: El cliente llegará con una serie de comentarios (que traduciremos en especificaciones) de lo que debe y no debe hacer esta calculadora.

Nosotros como desarrolladores sabemos entonces que esta calculadora deberá ejecutar una serie de acciones, y sabremos varios casos de uso donde deberá hacer siempre lo mismo, cada vez que ejecutemos el código:

```javascript
// Pseudo código similar a implementación de pruebas
import { calculadora } from '/ruta/a/calculadora.js'

descripcion('Módulo de suma de calculadora', () => {
  test('Al ingresar los números 3 y 4, el resultado es 7', () => {
    esperamosQue(calculadora.suma(3,4)).seaIgualA(7)
  })

  test('Al ingresar un número y cero, el resultado es el número', () => {
    let numero = // Un número
    esperamosQue(calculadora.suma(numero, 0)).seaIgualA(numero)
  })
})
```

Ahora que tenemos nuestras pruebas para el módulo de suma de nuestra calculadora, podremos escribir la implementación real de la calculadora (que normalmente es más difícil de hacer).
Además, junto con nuestros tests, tenemos ahora la posibilidad de validar que, cada vez que hacemos un cambio, estos no rompen la implementación o funcionalidad del módulo de suma de nuestra calculadora.

```javascript
// Archivo de implementación de calculadora.

function calculadora(argumentos) {
  /**
   * Implementación productiva de la calculadora
   */
}

```

Esta metodología de escribir primero las pruebas, y luego la implementación real del código se conoce como TDD (Test Driven Development) o BDD (Behavior Driven Development), donde creamos una suite de pruebas para las especificaciones de la implementación, y luego se crea la emplementación real.

## Jest

Jest como librería de testing, permite utilizar una librería de aserciones con una sintaxis familiar y conocida dentro del entorno JS, similar al pseudocódigo propuesto en el ejemplo anterior.

Para agregarlo como dependencia de nuestro proyecto usaremos

```bash
# Versión larga del comando
npm install --save-dev jest

# Versión corta del comando
npm i -D jest
```

que descargará a nuestro proyecto las dependencias de la librería Jest. Y aprovecharemos de actualizar nuestra llave `"script"` en el archivo `package.json` 

```json
{
  /** Resto de la configuración */
  "scripts": {
    "test": "node --experimental-modules --experimental-vm-modules node_modules/jest/bin/jest.js", // más posibles opciones del runner
    "dev": "comando de inicio de desarrollo"
  }
  //...
}
```

De momento no está completamente implementada la especificación ES6 con Jest, por lo que estaremos usadno los módulos experimentales de Node,



<!-- Enlaces externos -->

[jest]: https://jestjs.io/docs/getting-started
