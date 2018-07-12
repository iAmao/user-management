import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

import logger from 'lib/logger'
import * as routes from './routes'

const { PORT = 7000, NODE_ENV = 'development' } = process.env

const server = express()

// const router = express.Router()

server.use(helmet())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

// routes.v1(server, router)

if (NODE_ENV === 'development') {
  server.listen(PORT, () => logger.log(`
    server started on PORT:${PORT} 🚀
    ---------------------------------
  `))
}

export default server
