var socket = io()

let pulsado, context
var movimientos = new Array()

const createBoard = () => {
  let canvasUb = document.getElementById('board')
  let canvas = document.createElement('canvas')
  canvas.setAttribute('width', 500)
  canvas.setAttribute('height', 500)

  canvasUb.appendChild(canvas)

  context = canvas.getContext('2d')

  $('canvas').mousedown((event) => {
    pulsado = true
     var offset = $('#board').offset()
     console.log(offset)
     console.log(event.pageX)
    socket.emit('draw', [event.pageX - offset.left, event.pageY - offset.top, false])
  })

  $('canvas').mousemove((event) => {
    var offset = $('#board').offset()
    if (pulsado) {
      socket.emit('draw', [event.pageX - offset.left, event.pageY - offset.top, true])
    }
  })

  $('canvas').mouseup((e) => {
    pulsado = false
  })
  $('canvas').mouseleave((e) => {
    pulsado = false
  })
}

const drawing = (mov) => {
  movimientos.push(mov)
  context.lineJoin = 'round'
  context.lineWidth = 6
  context.strokeStyle = 'black'
  for (var i = 0; i < movimientos.length; i++) {
    context.beginPath()
    if (movimientos[i][2] && i) {
      context.moveTo(movimientos[i - 1][0], movimientos[i - 1][1])
    } else {
      context.moveTo(movimientos[i][0], movimientos[i][1])
    }
    context.lineTo(movimientos[i][0], movimientos[i][1])
    context.closePath()
    context.stroke()
  }
}

socket.on('update', (_mov) => {
  drawing(_mov)
})
const limpiarCanvas = () => {
  var canvas = $('canvas')
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
