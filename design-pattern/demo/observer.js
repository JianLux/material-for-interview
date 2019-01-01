var Observer = (function () {
  // 防止消息队列暴露而被篡改故将消息容器作为静态私有变量保存
  var _messages = {}
  return {
      // 注册信息接口
      regist: function (type, fn) {
          // 如果此消息不存在则应该创建一个该消息类型
          if(typeof _messages[type] === 'undefined') {
              // 将动作推入到该消息对应的动作执行队列中
              _messages[type] = [fn]
              // 如果此消息存在
          }else {
              // 将动作方法推入到该消息对应的动作执行序列中
              _messages[type].push(fn);
          }
      },
      
      // 发布信息接口
      fire: function (type, args) {
          // 如果该消息没有被注册，则返回
          if (!_messages[type]) {
              return;
          }
          // 定义消息信息
          var events = {
              type: type,
              args: args || {}
          },
          i = 0,
          len = _messages[type].length;
          // 遍历消息动作
          for(; i < len; i++) {
              // 依次执行注册的消息对应的动作序列
              _messages[type][i].call(this, events);
          }
      },
      // 移除信息接口
      remove: function (type, fn) {
          // 如果消息动作队列存在
          if(_messages[type] instanceof Array) {
              // 从最后一个消息动作遍历
              var i = _messages[type].length - 1;
              for(; i >= 0; i--) {
                  // 如果存在该动作则在消息动作序列中移除相应的动作
                  _messages[type][i] === fn && _messages[type].splice(i,1)
              }
          }
      }
  }
})()

var Student = function (result) {
  var that = this;
  // 学生回答的结果
  that.result = result
  that.say = function() {
    console.log(that.result)
  }
}

// 定义学生回答问题的方法
Student.prototype.answer = function(question) {
  // 注册参数的问题
  Observer.regist(question, this.say)
}

// 正在睡觉的学生不能回答问题
Student.prototype.sleep = function(question) {
  console.log(this.result + ' ' + question + ' 已被注销')
  // 取消对老师问题的监听
  Observer.remove(question, this.say)
}

var Teacher = function () {}
// 教室提问问题的方法
Teacher.prototype.ask = function (question) {
  console.log('问题是：' + question);
  // 发布提问消息
  Observer.fire(question)
}

var s1 = new Student('学生1回答了'),
    s2 = new Student('学生2回答了'),
    s3 = new Student('学生3回答了'),
    s4 = new Student('学生4回答了')

s1.answer('什么是设计模式')
s2.answer('和风帅不帅')
s3.answer('什么是设计模式')
s3.answer('和风帅不帅')

s3.sleep('和风帅不帅')


var teacher = new Teacher()

teacher.ask('和风帅不帅')