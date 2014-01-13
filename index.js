"use strict";
var fs = require('fs')
var cp = require('child_process')
var path = require('path')
var stream = require('stream')
var audioBg = __dirname + '/audio-background.jpg'

var baseTmpFile = path.join(require('os').tmpdir(), 'foi' + require('crypto').randomBytes(10).toString('hex'))
var tmpFileCt = 0

function noop (){}
function genPaths () {
  tmpFileCt++
  return {
    in: baseTmpFile + tmpFileCt,
    out: baseTmpFile + tmpFileCt + '.mp4'
  }
}

function cleanPaths (paths) {
  fs.unlink(paths.in, noop)
  fs.unlink(paths.out, noop)
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
        var rs = fs.createReadStream(paths.out)
        rs.on('error', error).on('end', function () { cleanPaths(paths) }) // clean up tmp files

        rs.pipe(ostream) // push data to output stream
      })
    })

  return ostream
}
