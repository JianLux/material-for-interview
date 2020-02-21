var events = require('events')
var net = require('net')
// 新建一个事件发射器
var channel = new events.EventEmitter()
channel.clients = {}
channel.subscriptions = {}

channel.on('join', function(id, client) {
  this.clients[id] = client
  this.subscriptions[id] = function(senderId, message) {
    if (id != senderId) {
      this.clients[id].write(message)
    }
  }
  // 添加一个专门针对当前用户的 broadcast 事件监听器
  this.on('broadcast', this.subscriptions[id])
})

var server = net.createServer(function (client) {
  var id = client.remoteAddress + ':' + client.remotePort
  console.log(client)
  console.log(id)
    channel.emit('join', id, client)
  client.on('data', function(data) {
    data = data.toString()
    channel.emit('broadcast', id, data)
  })
})

server.listen(8889)