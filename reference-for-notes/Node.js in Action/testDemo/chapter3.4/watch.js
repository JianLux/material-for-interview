// Watcher 类的构造器
function Watcher (watchDir, processedDir) {
  this.watchDir = watchDir
  this.processedDir = processedDir
}

// 继承事件发射器
var events = require('events'),
    util = require('util')

// inherits 函数是Node 内置的util模块里的。
util.inherits(Watcher, events.EventEmitter)

// 扩展事件发射器的功能
var fs = require('fs'),
    watchDir = './watch',
    processedDir = './done'

Watcher.prototype.watch = function () {
  var watcher = this
  fs.readdir(this.watchDir, (err, files) => {
    if (err) throw err;
    for(var index in files) {
      watcher.emit('process', files[index])
    }
  })
}

Watcher.prototype.start = function () {
  var watcher = this
  fs.watchFile(watchDir, function() {
    watcher.watch()
  })
}

// 创建一个对象
var watcher = new Watcher(watchDir, processedDir)
watcher.on('process', function process(file) {
  var watchFile = this.watchDir + '/' + file
  var processedFile = this.processedDir + '/' + file.toLowerCase()

  fs.rename(watchFile, processedFile, function(err) {
    if (err) {
      throw err
    }
  })
})

// 启动对目录的监控
watcher.start()