const db = require('../helpers/database')

// User
const checkMyAccount = async (req, res, next) => {
    try {
        if (req.payload.id != req.params.id) {
            var err = new Error('User không hợp lệ!')
            err.statusCode = 401
            next(err)
        }
        next()
    } catch (error) {
        next(error)
    }
}

const checkAdmin = async (req, res, next) => {
    try {
        const [result] = await db.execute(
            `SELECT permission
            FROM \`user\`
            WHERE \`id\` = '${req.payload.id}'`
        )

        if (result.permission !== 1) {
            var err = new Error('Bạn không có quyền thực hiện thao tác này!')
            err.statusCode = 401
            next(err)
        }
        next()
    } catch (error) {
        next(error)
    }
}

const checkDeleteUser = async (req, res, next) => {
    try {
        const [result] = await db.execute(
            `SELECT permission
            FROM \`user\`
            WHERE \`id\` = '${req.payload.id}'`
        )

        if (req.payload.id == req.params.id || result.permission === 1) {
            next()
            return
        }
        err = new Error('Bạn không thể xoá user này!')
        err.statusCode = 401
        next(err)
    } catch (error) {
        next(error)
    }
}

// News
const checkPostNews = async (req, res, next) => {
    try {
        const [result] = await db.execute(
            `SELECT permission
            FROM \`user\`
            WHERE \`id\` = '${req.payload.id}'`
        )

        if (result.permission === 3) {
            err = new Error('Bạn không có quyền đăng Tin tức!')
            err.statusCode = 401
            next(err)
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkMyAccount,
    checkAdmin,
    checkDeleteUser,
    checkPostNews
}