const config = require('../config/auth')
const db = require('../models')
const User = db.user
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


exports.register = (req, res) => {
    User.create({
        name: req.body.name, 
        phone: req.body.phone, 
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
    .then((user) => {
        res.status(201).json({
            massage: 'registered successful',
            ...user.data
        })
    }).catch((err) => {
        res.status(500).json({
            massage: err.massage
        })
    });
}

exports.login = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then((user) => {
        if(!user) {
            res.status(403).json({
                massage: 'User Not Found'
            })
        }
        let passwordInvalid = bcrypt.compareSync(req.body.password, user.password)

        if(!passwordInvalid){
            return res.status(400).json({
                accessToken: null,
                massage: 'invalid password'
            })
        }

        let token = jwt.sign({ id: user.id}, 
            config.secret, 
            { expiresIn: 86400 }
        )

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token
        })

    }).catch((err) => {
        res.status(500).json({
            massage: err.massage
        })
    });
}