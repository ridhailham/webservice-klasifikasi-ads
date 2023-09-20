const controller = require('../controllers/auth')
const middleware = require('../middleware/isUserExist')

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
        )
        next()
    })

    app.post('/register', middleware.isUserExist, controller.register)
    app.post('/login', controller.login)
}