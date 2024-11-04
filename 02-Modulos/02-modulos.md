# Módulos Node

En términos genéricos los módulos son los "ladrillos" en una aplicación. 
Divide el código en pequeñas unidades que se desarrollan y testean de manera independiente.

También permiten mantener aisladas variables y funciones que no se han marcado de manera explicita para ser exportadas.

En otros lenguajes se encuentran similitudas con conceptos como: 

- package: java, go, php, rust o dart
- assembly: .NET
- librería (gema): ruby
- unit: en dialectos Pascal

La terminología no es la más exacta pq cada lenguaje tiene sus propias características únicas, pero hay una sobreposición imporante entre todos.

## CJS y ESM

Node viene con dos "sabores" de módulos: **CommonJS** (CJS) y **ECMAScript Modules** (ESM)

## ¿Por qué Modulos?

Un buen sistema de módulos responde a necesidades fundamentales de la ingeniería de software:

- *Separar la base de código en multiples archivos*: Esto ayuda a tener el código más organizado, fácil de entender y ayuda el desarrollo y testeo de funcionalidades independientes unas de otras.

- *Permite el reuso de código en múltiples proyectos*

- *Encapsulación (o esconder información)*: Generalmente es buena idea esconder la complejidad de la implementación y sólo exponer interfaces simples con responsabilidades claras. La mayoría de los sistemas de módulos permiten mantener partes privadas y públicas del código

- *Manejo de dependencias*: un buen sistema de módulos permite a los desarrolladores de módulos construir sobre módulos existentes incluyendo módulos de terceros.

> [!NOTE]
> El **módulo** es distinto al **sistema de módulos** el primero es la unidad de software, mientras que el segundo es la sintaxis y conjunto de herramientas que permite definir módulos y usarlo dentro de los proyectos.

## Uso de módulos en Node

Cuando node apareció existían diversos tipos de módulos para JavaScript en el Front End, marcados por la aparición de Angular, JQuery y otras librerías.

En ese tiempo, aparte de la etiqueta `<script></script>` para traer archivos JS, se usaba CommonJS, por lo que se decidió usar esa manera de implementar módulos, permitiendo la lectura de archivos JS que estaban en el servidor.

> [!TIP]
> Con la finalidad de entender mejor los módulos ESM, los cuales tendrán menos necesidad de refactorización en el futuro, es bueno entender CommonJS.

## Patrón de módulo

Un problema importante de JS en el navegador era la falta de `namespaces` (espacios de nombres). Todo se ejecutaba en el scope global, por lo que era fácil sobreescribir funciones de terceros.

Una técnica clásica para resolver este problema es el patrón de módulo:

```javascript
const miModulo = ( () => {
  const funcionPrivada = () => {}
  const variablePrivada = []

  const funcionPublica = () => {/** lógica */}
  const variablePublica = {}

  const exported = {
    funcionPublica,
    variablePublica
  }

  return exported
}) () 
// el paréntesis envolviendo la función y al final de esta hace que ésta sea invocada

// Puedes usar el módulo así:

console.log(miModulo.funcionPublica)
console.log(miModulo.variablePublica)
```

Este patron una una función auto invocada, o `IIFE` (`Immediately Invoked Function Expression`), lo que permite crear un scope privado, y exportar sólo las partes que expondrán al público.

En éste caso las funciones expuestas en `return` tendrán la responsabilidad de propagar información del scope privado al exterior.

de ésta forma si quisieramos acceder a las variables o funciones privadas del módulo no podremos:


```javascript
console.log(miModulo.funcionPrivada) // -> undefined
console.log(miModulo.variablePrivada) // -> undefined
```

## Módulo CommonJS

La idea anterior es l abase para el sistema CommonJS (los primeros módulos que existieron dentro de Node.js). 

En node CommonJS respeta las especificaciones y agrega algunas extensiones customizadas.

### Ideas principales de la especificación:

- ``require`` es una función que te permite importar un módulo del filesystem

- `exports` y `module.exports` son variables especiales que se pueden usar para exportar funcionalidades públicas del módulo actual.

## Un cargador de módulos casero

Hagamos un sistema casero de módulos para entender el funcionamiento de `CommonJS`

- Se creará una función que cargue el contenido de un módulo, lo envuelva en un scope privado y luego lo evalúe:

```javascript
function loadModule (filename, module, require) {
  const wrappedSrc =
    `(function (module, exports, require) {
      ${fs.readFileSync(filename, 'utf8')}
    })(module, module.exports, require)`
  eval(wrappedSrc)
}
```

La función anterior, envuelve el código de un módulo dentro de una `IIFE`, tal como en el patrón de módulo.

La diferencia es que pasamos un listado de variables al módulo: 

- `module`
- `exports`
- `require`

> [!NOTE]
> Es importante notar que la función `IIFE` recibe `module.exports` en el argumento `exports`

> [!WARNING]
> También es importante notar que se usa readFileSync, lo que no es recomendado!

> [!CAUTION]
> Es de suma importancia mencionar que la función `eval()` puede llevar a ataques de inyección de código, por lo que debe ser usada con precaución extrema o evitarla en lo posible

La aproximación sincrónica es porque la carga de módulos CommonJS es deliberadamente sincrónica, para asegurarse que en caso de importar multiples módulos y dependencias, se carguen en el orden correcto.

Implementemos la función `require()`:

```javascript
function require (nombreModulo) {
  console.log(`require invocada para el módulo: ${nombreModulo}`)

  const id = require.resolve(nombreModulo) // (1)

  if (require.cache[id]) { // (2)
    return require.cache[id].exports
  }

  // Metadata del módulo
  const module = {  // (3)
    exports: {},
    id
  }

  // Actualizar el caché
  require.cache[id] = module  // (4)

  // Cargar el módulo
  loadModule(id, module, require) // (5)

  // retornar las variables exportadas por el módulo
  return module.exports  // (6)
}

require.cache = {}
require.resolve = (moduleName) => {
  /** resuelve un id de modulo desde el nombre de módulo (full path) */
}
```

La función anterior simula la `require()` original de Node.js, que se usa para cargar un módulo. Es sólo para propósito de aprendizaje y no refleja el comportamiento interno de la función real.
En éste caso es muy útil para entender la carga y definición de módulos.

Se puede explicar lo que hace la función de la siguiente forma: 

1. Se acepta un nombre de módulo como input. Lo primero que hacemos es resolver el full path del módulo, que se llamará `id`. La tarea se delega a `require.resolve()`

2. Si el módulo se cargó en el pasado, entonces está disponible en el caché. En ese caso simplemente se retorna

3. Si el módulo no se había cargado antes, se configura el ambiente para una primera carga: Se crea el objedo `module` que contiene una propiedad `exports` iniciada con un objeto vacío. Este objeto será poblado con el código que el módulo exporta a su API pública.

4. Después de su primera carga el `module` se almacena en `cache`

5. El código fuente es leído del archivo y luego evaluado, de la forma vista anteriormente, en este caso el módulo exporta su API pública reemplazando el objeto `module.exports`

6. Finalmente el contenido de `module.exports`, que representa el API Pública del módulo se retorna a su invocador.

### Definiendo un Módulo

Mirando la implementación anterior de la función `require()` podemos inferir cómo crear un módulo. El siguiente código de un ejemplo: 

```javascript
// Carga otra dependencia
const dependency = require('./anotherModule')

// función privada
function log() {
  console.log(`Bien hecho ${dependency.username}`)
}

// el API a ser exportada para uso público
module.exports.run = () => {
  log()
}

```

> [!NOTE]
> En CommonJS todo es privado a menos que sea asignado a la variable module.exports. El contenido de la variable es asignado a la caché y luego retornado cuando el módulo es cargad usando `require()`

