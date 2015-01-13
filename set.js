"use strict"
var extend = require("extend")
var mutatePackageJson = require("./mutate-package-json.js")

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
  if (opts._.length != 2) usage("Incorrect number of arguments")

  var key = opts._[0]
  var value = opts._[1]

  mutatePackageJson(function (data) {
    if (!data.scripts) data.scripts = {}
    if (value == "") {
      delete data.scripts[key]
    }
    else {
      data.scripts[key] = value
    }
  }, function (er) {
    if (er) error(er)
    console.log( (value == "" ? "cleared" : "set") + ": "+key)
  })
}

function usage(er) {
  if (er) console.error(er)
  console.error("Usage: "+process.argv[1]+" [--help] set scriptname \"script\"")
  console.error("Adds or sets scriptname in your package.json to execute script. If it's one")
  console.error("of npm's lifecycle names then npm will execute it automatically.")
  process.exit(1)
}

function error(er) {
  console.error(er)
  process.exit(1)
}
