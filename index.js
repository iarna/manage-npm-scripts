"use strict"
var opts = require("minimist")(process.argv.slice(2), {stopEarly: true, boolean: true})
if (opts._.length==0) usage()
var cmd = opts._.shift()

var cmds = {
  "set": require("./set.js"),
  "get": require("./get.js"),
  "ls":  require("./ls.js")
}

if (!cmds[cmd]) usage("Unknown command '"+cmd+"'")

cmds[cmd](opts)

function usage(err) {
  if (err) console.error(err)
  console.error("Usage: "+process.argv[1]+" [--help] cmd [args...]")
  console.error("Where cmd is: set, get, ls")
  process.exit(1)
}
