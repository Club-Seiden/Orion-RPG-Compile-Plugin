// https://bitbucket.org/litmis/poormanscompilerpgfrompase/src/357bf4f60bc5c878ec50121b0963292f8dfd1ed6/compile.js?at=master&fileviewer=file-view-default

const readline = require('readline')
const fs = require('fs')
var xt = require('/QOpenSys/QIBM/ProdData/Node/os400/xstoolkit/lib/itoolkit')
var conn = new xt.iConn("*LOCAL")

const compile_file = process.argv[2] || './compile'
const rl = readline.createInterface({
  input: fs.createReadStream(compile_file)
})
 
rl.on('line', function (line) {
  if (/^\s*$/.test(line)) return; // Ignore blank lines
  console.log('Running:', line)
  conn.add(xt.iCmd(line))
})

rl.on('close', function(){
  conn.run(function cb(str) {
    console.log(str)
    console.log(JSON.stringify(xt.xmlToJson(str), null, 4));
  })  
})
