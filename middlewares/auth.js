const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({
            status: "error",
            message: "No token provided"
        })
    } else {
        const token = req.headers.authorization.split(" ")[1]
        if (token) {
            jwt.verify(token, process.env.secret, (err) => {
                if (err) {
                    res.status(401).json({
                        status: "error",
                        message: err
                    })
                } else {
                    next()
                }
            })
        } else {
            res.status(401).json({
                status: "error",
                message: "No token provided"
            })
        }
    }
}