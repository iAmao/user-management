import lf from '@lf/routes'
import student from '@student/routes'
import createRoutes from 'lib/router'

const BASE = '/api/v1'

export default (app, router) => {
  createRoutes(lf, router)
  createRoutes(student, router)
  app.use(BASE, router)
}
