const config = require('../config/auth')

const User = require('../models/UsersModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


exports.register = (req, res) => {
    User.create({
        name: req.body.name, 
        
        email: req.body.email,
        role: req.body.role,
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


exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            return res.status(403).json({
                message: 'User Not Found'
            });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(400).json({
                accessToken: null,
                message: 'Invalid password'
            });
        }

        const userId = user.uuid;
        const name = user.name;
        const email = user.email;
        const role = user.role;

        const accessToken = jwt.sign({ userId, name, email, role },
            config.secret, // Secret key
            {
                expiresIn: '3h', // Token expiration time (adjust as needed)
            }
        );

        // const refreshToken = jwt.sign({ userId }, config.secret, {
        //     expiresIn: '86400'
        // });

        // await User.update({ refresh_token: refreshToken }, {
        //     where: {
        //         uuid: userId
        //     }
        // });

        req.userId = decode.id

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            accessToken: accessToken,
            refreshToken: refreshToken // Menambahkan refreshToken dalam respons
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}



// exports.login = async (req, res) => {
//     await User.findOne({
//         where: {
//             email: req.body.email
//         }
//     })
//     .then((user) => {
//         if(!user) {
//             res.status(403).json({
//                 massage: 'User Not Found'
//             })
//         }
//         let passwordInvalid = bcrypt.compareSync(req.body.password, user.password)

//         if(!passwordInvalid){
//             return res.status(400).json({
//                 accessToken: null,
//                 massage: 'invalid password'
//             })
//         }

//         const userId = user.uuid
//         const name = user.name
//         const email = user.email
//         const role = user.role

//         const accessToken = jwt.sign({ userId, name, email, role},
//             'secret-key', // Secret key
//             {
//               expiresIn: '3h', // Token expiration time (adjust as needed)
//             }
//           );
        
//           const refreshToken = jwt.sign({userId}, 
//             'secret-key',
//             {
//               expiresIn: '1d'
//             })
        
//           User.update({refresh_token: refreshToken}, {
//             where: {
//               uuid: userId
//             }
//           })
        
//           res.cookie("refreshToken", refreshToken, {
//             httpOnly: true,
//             maxAge: 24 * 60 * 60 * 1000,
            
//           });
      

//         res.status(200).json({
//             uuid: user.uuid,
//             name: user.name,
//             email: user.email,
//             accessToken: token
//         })

//     }).catch((err) => {
//         res.status(500).json({
//             massage: "gagal"
//         })
//     });
// }

