# audio2video [![Build Status](https://secure.travis-ci.org/wavded/audio2video.svg)](http://travis-ci.org/wavded/audio2video)

audio2video will convert any ffmpeg supported input audio stream into a output video stream (codec: mp4).

## Requirements

audio2video requires the command line tool *ffmpeg* - [ffmpeg install page](http://ffmpeg.org/download.html).  It has been tested on 2.x branch (note: libx264 encoding support required)

## Installation

    npm install audio2video

[![NPM](https://nodei.co/npm/audio2video.png?downloads=true)](https://nodei.co/npm/audio2video)

## Usage

audio2video takes an input audio stream and returns an output video stream.

```js
var audio2video = require('audio2video')
var fs = require('fs')
var input = fs.createReadStream('./myaudio.m4a')
audio2video(input).pipe(fs.createWriteStream('./out.mp4'))
```

## License

(The MIT License)

Copyright (c) 2015 Marc Harter &lt;wavded@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

