'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  REQ_PRE: '"http://"',
  // API_ROOT: '"192.168.100.254"',
  API_ROOT: '"192.168.100.94"',
  API_PORT:'":8095"',
  API_PATH: '"/produce/resources/rs/"',
  API: '"/api"'
})
