const db = require('../helpers/database')

async function getListChat(id_group) {
    try {
        const result = await db.execute(
            `SELECT 
            c.\`id\`, c.\`content\`, c.\`image\`, c.\`id_group\`, c.\`id_user\`, u.name, u.avatar
            FROM \`chat\` AS c
            INNER JOIN \`user\` AS u ON u.\`id\` = c.\`id_user\`
            WHERE c.id_group = '${id_group}'`)
        return {
            code: 200,
            data: result
        }
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    getListChat
}