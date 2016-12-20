const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static('public'))
app.set('view engine', 'pug')

io.on('connection', (socket) => {
  socket.on('draw', (_mov) => {
    io.sockets.emit('update', _mov)
  })
})

app.get('/', (req, res) => {
  res.render('home')
})

http.listen(8080, () => {
  console.log('corriendo en 8080')
})
