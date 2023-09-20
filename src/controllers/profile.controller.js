
const User = require("../models/UsersModel.js")

exports.profile = (req, res) => {
    User.findOne({
        where: {
            email: req.email
        }
    })
        .then((user) => {
            if(!user) {
                return res.status(404).json({
                    message: 'pengguna tidak ditemukan'
                })
            }

            res.status(200).json({
                uuid: user.uuid,
                name: user.name,
                
                email: user.email
            })
        }).catch((err) => {
            res.status(500).json({
                massage: err            
            })
        });
}