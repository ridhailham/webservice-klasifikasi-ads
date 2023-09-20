const controller = require('../controllers/profile.controller')
const middleware = require('../middleware/authJwt.js')

module.exports = (router) => {
    router.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
        )
        next()
    })

    router.get('/me', middleware.verifyToken, controller.profile)

}