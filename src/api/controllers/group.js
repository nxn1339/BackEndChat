const db = require('../helpers/database')

async function getListGroup(id_user) {
    try {
        const result = await db.execute(
            `SELECT g.id, g.id_user as Owner, g.image, g.name 
                FROM \`group\` AS g 
                INNER JOIN member AS m ON g.id = m.id_group 
                WHERE m.id_user = '${id_user}';`)

        return {
            code: 200,
            data: result
        }
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    getListGroup
}