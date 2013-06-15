## Instalation

    npm install env-config-loader

## Usage

### Load config specification from JSON file

    var config = require('env-config-loader')('config.spec.json');

### Load from config specification object

    var config = require('env-config-loader')({
      redis: {
        host: {
          'default': '127.0.0.1',
          envVar: 'CONFIG_REDIS_HOST'
        },
        port: {
          'default': 6739,
          envVar: 'CONFIG_REDIS_PORT'
        },
        pass: {
          'default': '',
          envVar: 'CONFIG_REDIS_PASS'
        }
      },
      cluster: {
        'default': false,
        envVar: 'CONFIG_CLUSTER'
      }
    });

### Expose loaded config

    module.exports = require('env-config-loader')('config.spec.json');

## License

(The MIT License)

Copyright (c) 2013 Tymoteusz Paszun <tpaszun@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
