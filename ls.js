"use strict"
var extend = require("extend")
var fs = require("fs")

module.exports = function (args) {
  var opts = require("minimist")(args._, {boolean: true})
  extend(opts, args)
  Object.keys(opts).forEach(function(opt) {
    switch (opt) {
      case '_': break
      case 'help': usage()
      default: usage('Unknown option --'+opt)
    }
  })
  if (opts._.length != 0) usage("Incorrect number of arguments")

  var jsonFile = "package.json"
  fs.readFile(jsonFile, function (er, data) {
    if (er) error("Error reading package.json: "+er.message)
    try {
      data = JSON.parse(data.toString("utf8"))
    }
    catch (er) {
      error("Error parsing package.json: "+er.message)
    }
    if (!data.scripts) data.scripts = {}
    Object.keys(data.scripts).forEach(function (key) {
      console.log(key+": "+data.scripts[key])
    })
  })
}

function usage(er) {
  if (er) console.error(er)
  console.error("Usage: "+process.argv[1]+" [--help] ls")
  console.error("Lists the scripts configured in the current package.json")
  process.exit(1)
}

function error(er) {
  console.error(er)
  process.exit(1)
}
