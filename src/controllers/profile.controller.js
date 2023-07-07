const db = require('../models');
const User = db.user

exports.profile = (req, res) => {
    User.findByPk(req.userId)
        .then((user) => {
            return res.status(200).json({
                id: user.id,
                name: user.name,
                phone: user.phone,
                email: user.email
            })
        }).catch((err) => {
            return res.status(500).json({
                massage: err.massage
            })
        });
}