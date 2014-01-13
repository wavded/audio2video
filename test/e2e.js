var test = require('tap').test
var audio2video = require('../')
var fs = require('fs')

test('audio to mp4 video', function (t) {
  var input = fs.createReadStream(__dirname+'/fixtures/input.m4a')
  var output = fs.createWriteStream(__dirname+'/fixtures/output.mp4')
  audio2video(input).pipe(output)
    .on('finish', function () {
      t.end()
    })
})
