# Arquitectura TCP/IP

Internet viene del aplicativo militar Arpanet creado el 1 de enero de 1983, interconectando computadores usando la pila de protocolos **TCP/IP**

El exito se debe a la interfaz de sockets, que permite identificar aplicaciones dentro de una máquina.

## Puertos

Cada computador tiene una serie de puertos done se asigna uno a las aplicaciones.

## IP

Dentro de los protocolos IP, la dirección IP permite encontrar una máquina de forma única en internet. 

Existen 2 formatos de dirección IP: 

- IPV4: una secuencia de 4 números de 32 bits. 
- IPV6: una secuencia de 4 números de 128 bits.

Estamos en un momento de transición de IPV4 a IPV6

## Protocolos TCP/UDP

Una vez establecida la conexión IP, y definidos los puertos de las aplicaciones a conectar, se utilizan distintos protocolos para comunicarse entre las aplicaciones: 

- TCP: protocolo orientado a conexión, que tiene mecanismos para evitar la pérdida de datos en la transmisión.

- UDP: protocolo de datagramas que no analiza pérdida de paquetes, por lo que es más rápido, principalmente usado en aplicaciones de tipo VoIP o Broadcast. Tiene como tipos de comunicación principales:

    - Unicast
    - Broadcast

## Sockets

Una vez definidos las máquinas que se comunicarán, los puertos y protocolos a usar, estamos hablando de un **socket**. Así podemos definir como la tupla:

$(IP_{server}, IP_{client}, Puerto_{server}, Puerto_{client})$

Todo esto asociado a un protocolo específico de comunicación.

## Roles de los computadores

Los computadores pueden tener distintos roles dentro de la red, esto depende del tipo de aplicaciones que estén usando: 

### Clientes (computadores que ejecutan aplicaciones clientts)

Un computador que ejecuta una aplicación cliente, y que esta pueda efectivamente realizar operaciones en red se necesitan los siguientes elementos:

1. Dirección IP del computador que ejecuta la Aplicación Servidora
2. Puerto donde se ejecuta la aplicación servidora
3. Protocolo de comunicación entre las aplicaciones Cliente-Servidor

Con ésto podemos establecer el *SOCKET* desde el cual las aplicaciones operarán

Puedes ver el archivo `socket-01.js` y `socket-02-msg.js`