/**
 * Ejemplo de aplicación Cliente TCP conectado a Google
 * 
 * Usage: "node socket-01.js <host> <port>"
 * Example: "node socket-01.js google.com 80"
 */

import net from 'node:net'
const host = process.argv[2] || 'localhost'
const port = process.argv[3] || 7000

const socket = net.createConnection({ host, port })

socket.on('connect', () => {
  process.stdout.write(`Server at port ${port} of ${host} Successfully connected`)

  // Elimina los listener para errores
  socket.removeAllListeners('error')
  // Cierra conexión
  socket.destroy();
})

socket.on('error', () => {
  process.stdout.write(`No server at port ${port} of ${host}`)
})