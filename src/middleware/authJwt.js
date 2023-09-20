const jwt = require('jsonwebtoken');
const config = require('../config/auth.js'); // Pastikan Anda mengimpor konfigurasi yang benar

exports.verifyToken = (req, res, next) => {
    let token = req.headers['authorization']

    

    if (!token) {
        return res.status(403).json({
            message: 'Token tidak tersedia'
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        // Simpan informasi pengguna yang diperoleh dari token dalam objek `req`
        req.userId = decoded.id;
        next();
    });
};


// const jwt = require('jsonwebtoken')
// const config = require('../config/auth')

// exports.verifyToken = (req, res, next) => {
//     const token = req.cookies.refreshToken; // Ubah dari "token" menjadi "refreshToken" sesuai dengan kode login Anda

//     if (!token) {
//         return res.status(403).json({
//             message: 'No token provided'
//         });
//     }

//     jwt.verify(token, config.secret, (err, decoded) => { // Gunakan kunci yang sama dengan yang digunakan dalam kode login Anda
//         if (err) {
//             return res.status(401).json({
//                 message: 'Unauthorized'
//             });
//         }
//         req.userId = decoded.userId; // Ubah dari "id" menjadi "userId" sesuai dengan payload token Anda
//         console.log(req.userId);
//         next();
//     });
// };

