const db = require('../helpers/database')

async function getListMessage(keyword) {
    try {
        const result = await db.execute(
            `SELECT *
            FROM \`message\`
            WHERE 
                \`message\`.\`content\` LIKE '%${keyword ?? ''}%'
            ORDER BY \`message\`.\`id\` ASC`
        )

        return {
            code: 200,
            data: result
        }
    } catch (error) {
        throw (error)
    }
}

async function addMessage(message) {
    try {
        await db.execute(
            `INSERT INTO \`message\`(
                \`id\`,
                \`from_id_user\`,
                \`id_user\`,
                \`content\`,
                \`image\`
            )
            VALUES(
                uuid(), 
                '${message.from_id_user}',
                '${message.id_user}',
                '${message.content}',
                '${message.image}'
            )`
        )

        return {
            code: 200,
            message: "gửi thành công!"
        }
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    getListMessage,
    addMessage
}