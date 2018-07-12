import * as LF from '../controllers'

export default [
    ['get', '/lfs', LF.all],
    ['post', '/lfs', LF.signup],
    ['post', '/lfs/login', LF.login]
]
