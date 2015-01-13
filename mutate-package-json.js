"use strict"
var fs = require("fs")

module.exports = function (todo, cb) {
  var jsonFile = "package.json"
  fs.readFile(jsonFile, function (er, data) {
    if (er) return cb("Error reading package.json: "+er.message)
    try {
      data = JSON.parse(data.toString("utf8"))
    }
    catch (er) {
      return cb("Error parsing package.json: "+er.message)
    }
    todo(data)
    fs.writeFile(jsonFile, JSON.stringify(data, null, 2), function (er) {
      if (er) return cb("Error writing package.json: "+er.message)
      cb()
    })
  })
}