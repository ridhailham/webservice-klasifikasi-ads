const User = require('../models/UsersModel.js')



exports.isUserExist = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then((user) => {
        if(user) {
            return res.status(400).json({
                massage: 'email is already exists!'
            })
            
        }
        next()
    })

    
}
