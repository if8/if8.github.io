const extendBaseConfig = require('./webpack/config.base.js')

const env = process.env.NODE_ENV || 'dev'

const envConfig = require(`./webpack/config.${env}.js`)

module.exports = extendBaseConfig(envConfig)
