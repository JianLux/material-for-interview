var fs = require('fs')
var path = require('path')
// 拿到参数
var args = process.argv.splice(2)
// 取出第一个参数
var command = args.shift()
var taskDescription = args.join(' ')
var file = path.join(process.cwd(), '/.tasks')


switch (command) {
  case 'list':
    listTasks(file)
    break
  case 'add':
    addTask(file, taskDescription)
    break
  default:
    console.log('Usage: ' + process.argv[0]) + ' list|add [taskDescription]'
}

/**
 *这种函数回调处理的方式值得思考和学习
 * 
 * @param {*} file
 * @param {*} cb
 */
function loadOrInitializeTaskArray(file, cb) {
  fs.exists (file, (exists) => {
    var tasks = []
    if (exists) {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err
        var data = data.toString()
        tasks = JSON.parse(data || '[]')
        cb(tasks)
      })
    } else {
      cb([])
    }
  })
}

function listTasks(file) {
  loadOrInitializeTaskArray(file, (tasks) => {
    for (var i in tasks) {
      console.log(tasks[i])
    }
  })
}

function storeTasks(file, tasks) {
  fs.writeFile(file, JSON.stringify(tasks), 'utf8', (err) => {
    if (err) throw err
    console.log('Saved')
  })
}

function addTask (file, taskDescription) {
  loadOrInitializeTaskArray(file, (tasks) => {
    tasks.push(taskDescription);
    storeTasks(file, tasks)
  })
}