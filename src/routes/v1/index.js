// import learningFacilitator from 'src/'
import lf from '@lf/routes'
import createRoutes from 'lib/router'

const BASE = '/api/v1'

export default (app, router) => {
//   party(router)
  createRoutes(lf, router)
  app.use(BASE, router)
}
