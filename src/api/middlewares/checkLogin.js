const { verifyToken } = require('../helpers/token')

const checkLogin = async (req, res, next) => {
    if (!req.headers.authorization) {
        var err = new Error('Bạn chưa đăng nhập!')
        err.statusCode = 401
        next(err)
        return
    }

    try {
        const bearerToken = req.headers.authorization.split(' ')
        const token = bearerToken[1]

        req.payload = await verifyToken(token)
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkLogin
}