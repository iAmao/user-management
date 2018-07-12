import * as student from '../controllers'
import allow from '_middlewares/allow'

export default [
    ['get', '/students', allow('auth'), student.all],
    ['post', '/students', allow('auth'), student.create],
    ['get', '/student/:id', allow('auth'), student.one],
    ['put', '/student/:id', allow('auth'), student.update],
    ['delete', '/student/:id', allow('auth'), student.remove],
]
