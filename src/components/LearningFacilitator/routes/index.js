import * as LF from '../controllers'

export default [
    ['post', '/lfs', LF.signup],
    ['post', '/lfs/login', LF.login]
]
