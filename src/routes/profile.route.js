const controller = require('../controllers/profile.controller')
const middleware = require('../middleware/authJwt.js')

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
        )
        next()
    })

    app.get('/me', middleware.verifyToken, controller.profile)

}