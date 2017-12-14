const express = require('express')
const logger = require('./logger')
const argv = require('minimist')(process.argv.slice(2))
const setup = require('./middleware/frontendMiddleware')
const isDev = process.env.NODE_ENV !== 'production'
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
  ? require('ngrok')
  : false
const resolve = require('path').resolve
const bodyParser = require('body-parser')
const detect = require('detect-port')
const myApi = require('./api')
const app = express()
const prompt = require('./react-dev-utils/prompt')
const openBrowser = require('./react-dev-utils/openBrowser')
const chalk = require('chalk')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use('/api', myApi)

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/'
})

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST
const host = customHost || null // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost'
const protocol = process.env.HTTPS === true ? 'https' : 'http'

const DEFAULT_PORT = argv.port || process.env.PORT || 3000
const isInteractive = process.stdout.isTTY

detect(DEFAULT_PORT).then(port => {
  if (port === DEFAULT_PORT) {
    run(port)
    return
  }

  if (isInteractive) {
    const question = chalk.yellow(
      `Something is already running on port ${DEFAULT_PORT}. Change ports?`
    )

    prompt(question, true).then(shouldChangePort => {
      if (shouldChangePort) {
        run(port)
      }
    })
  } else {
    console.log(
      chalk.red(`Something is already running on port ${DEFAULT_PORT}`)
    )
  }
})
// Start your app.
const run = port => {
  app.listen(port, host, err => {
    if (err) {
      return logger.error(err.message)
    }

    // Connect to ngrok in dev mode
    if (ngrok) {
      ngrok.connect(port, (innerErr, url) => {
        if (innerErr) {
          return logger.error(innerErr)
        }

        logger.appStarted(port, prettyHost, url)
      })
    } else {
      logger.appStarted(port, prettyHost)
    }
    if (isDev) {
      // openBrowser(protocol + '://' + prettyHost + ':' + port + '/')
    }
  })
}
