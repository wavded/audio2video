"use strict";
var fs = require('fs')
var cp = require('child_process')
var path = require('path')
var stream = require('stream')
var audioBg = __dirname + '/audio-background.jpg'

var baseTmpFile = path.join(require('os').tmpdir(), 'foi' + require('crypto').randomBytes(10).toString('hex'))
var tmpFileCt = 0

function genPaths () {
  tmpFileCt++
  return {
    in: baseTmpFile + tmpFileCt,
    out: baseTmpFile + tmpFileCt + '.mp4'
  }
}

function cleanPaths (paths) {
  fs.unlink(paths.in, console.error)
  fs.unlink(paths.out, console.error)
}

module.exports = function (istream) {
  var ostream = new stream.PassThrough()

  function error (er) {
    ostream.emit('er', er)
    cleanPaths(paths)
  }
  istream.on('error', error)

  var paths = genPaths() // ffmpeg pipes are not reliable, opting for tmp files instead
  ostream.path = paths.out

  istream.pipe(fs.createWriteStream(paths.in))
    .on('finish', function () {
      var ffmpeg = cp.spawn('ffmpeg',
                ['-loop', '1',
                 '-i', audioBg,
                 '-i', paths.in,
                 '-c:v', 'libx264',
                 '-c:a', 'aac',
                 '-strict', 'experimental',
                 '-b:a', '192k',
                 '-shortest',
                 paths.out ])

      ffmpeg.on('error', error)
      ffmpeg.stderr.setEncoding('ascii')
      ffmpeg.stderr.on('data', function (chunk) { ostream.emit('ffmpeginfo', chunk) })

      ffmpeg.on('close', function () {
        fs.createReadStream(paths.out).pipe(ostream) // push data to output stream
          .on('finish', function () { cleanPaths(paths) }) // clean up tmp files
      })
    })

  return ostream
}
