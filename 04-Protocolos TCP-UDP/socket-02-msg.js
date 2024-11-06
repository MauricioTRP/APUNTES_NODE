/**
 * App similar a Telnet que permite enviar strings al servidor
 * 
 * Usage: "node socket-02-msg.js <host> <port>"
 */

import net from 'node:net'
const host = process.argv[2] || 'localhost'
const port = process.argv[3] || 9000

const socket = net.createConnection({host, port})

process.stdin.on('data', (data) => {
  // Si entra data por CLI, se envía a través del socket
  socket.write(data)
})

socket.on('data', (data) => {
  // Cuando entra data por el socket, se muestra por la salida stdout
  process.stdout.write(`\nResponse:\n ${data}`)
})

socket.on('error', (err) => {
  process.stdout.write(`\nNo server at ${host} : ${port}`)
  socket.destroy()
  process.exit()
})

socket.on('close', (stream) => {
  process.stdout.write(`\nClosed socket with:\n ${stream}`)
  process.exit()
})

// Continua la lectura después de operaciones del socket
process.stdin.resume()


