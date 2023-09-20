const controller = require('../controllers/auth')
const middleware = require('../middleware/isUserExist')

module.exports = (router) => {
    router.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
        )
        next()
    })

    router.post('/register', middleware.isUserExist, controller.register)
    router.post('/login', controller.login)
    router.delete('/logout', controller.logout)
}