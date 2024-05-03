const db = require('../helpers/database')

async function getListChat(id_group) {
    try {
        const result = await db.execute(
            `SELECT 
            c.\`id\`, c.\`content\`, c.\`image\`, \`time\`,c.\`id_group\`, c.\`id_user\`, u.name, u.avatar
            FROM \`chat\` AS c
            INNER JOIN \`user\` AS u ON u.\`id\` = c.\`id_user\`
            WHERE c.id_group = '${id_group}'
            ORDER BY \`time\` ASC;`)
        return {
            code: 200,
            data: result
        }
    } catch (error) {
        throw (error)
    }
}

async function getLastChat(id_group) {
    try {
        const result = await db.execute(
            `SELECT
                c.\`id\`, c.\`content\`, c.\`image\`, \`time\`,c.\`id_group\`, c.\`id_user\`, u.name, u.avatar
            FROM \`chat\` AS c
            INNER JOIN \`user\` AS u ON u.\`id\` = c.\`id_user\`
            WHERE c.id_group = '${id_group}'
            ORDER BY \`time\` DESC LIMIT 1;`)
        return {
            code: 200,
            data: result
        }
    } catch (error) {
        throw (error)
    }
}

async function addChat(chat) {
    try {
        await db.execute(
            `INSERT INTO \`chat\`(\`id\`, \`content\`, \`image\`, \`id_group\`, \`id_user\`) 
            VALUES (
                uuid(),
                '${chat.content}',
                '${chat.image}',
                '${chat.id_group}',
                '${chat.id_user}')`)
        return {
            code: 200,
            data: "Thêm thành công đoạn chat"
        }
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    getListChat,
    addChat,
    getLastChat
}