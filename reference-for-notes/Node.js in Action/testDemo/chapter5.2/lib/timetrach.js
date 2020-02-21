var qs = require('querystring')
// 发送HTML
exports.sendHtml = function(resizeBy, html) {
  res.setHeader('Content-Type', 'text/html; charset=utf8')
  res.setHeader('Content-Length', Buffer.byteLength(html))
  res.end(html)
}

exports.parseReceiveData = function (req, cb) {
  var body = ''
  req.on('data', (chunk) => {
    body += chunk
  })
  req.on('end', () => {
    var data = qs.parse(bady)
    cb(data)
  })
}

exports.actionForm = function(id, path, label) {
  var html = '<form method="POST" action="' + path + '">' + 
    '<input type="hidden" name="id" value="' + id + '">' + 
    '<input type="submit" value="' + label + '" />' + 
    '</form>'
  return html
}

// 添加工作记录
exports.add = function (db, req, res) {
  exports.parseReceiveData(req, (work) => {
    db.query(
      "INSERT INTO work (hours, data, description) " + 
      " VALUES (?, ?, ?)",
      [work.hours, work.date, work.description],
      (err) => {
        if (err) throw err
        exports.show(db, res)
      }
    )
  })
}

// 删除工作记录
exports.delete = function (db, req, res) {
  exports.parseReceiveData(req, (work) => {
    db.query(
      "DELETE FROM work WHERE id=?",
      [work.id],
      (err) => {
        if (err) throw err
        exports.show(db, res)
      }
    )
  })
}

// 归档一条工作记录
exports.archive = function(db, req, res) {
  exports.parseReceiveData(req, (work) => {
    db.query(
      "UPDATE work SET archived=1 WHERE id=?",
      [work.id],
      (err) => {
        if (err) throw err
        exports.show(db, res)
      }
    )
  })
}

exports.show = function(db, res, showArchived) {
  var query = "SELECT * FROM work " + 
    "WHERE archived=? " + 
    "ORDER BY data DESC"
  var archiveValue = (showArchived) ? 1 : 0
  db.query(
    query,
    [archiveValue],
    (err, rows) => {
      if (err) throw err
      var html = (showArchived) ? '' : 
      '<a href="/archived">Archived Work</a><br/>'
      // 将结果格式化为HTML表格
      html += exports.workHitlistHtml(rows)
      html += exports.workFormHtml()
      exports.sendHtml(res, html)
    }
  )
}

// 只显示归档的工作记录
exports.showArchived = function(db, res) {
  exports.show(db, res, true)                 // 只显示归档的工作记录
}
