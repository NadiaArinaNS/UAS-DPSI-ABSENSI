const jwt = require('jsonwebtoken');

module.exports = {
    authentication: (req, res, next) => {
        const token = req.headers.token;

        if (token) {
            const decoded = jwt.verify(token, process.env.SECRECT_KEY)

            if (decoded) {
                req.decoded = decoded
                next()
            } else {
                res.json({
                    message: "Karyawan unauthenticated!"
                })
    
            }
        } else {
            res.json({
                message: "Karyawan unauthenticated!"
            })
        }
    },
    verifyToken: verifyToken
}
