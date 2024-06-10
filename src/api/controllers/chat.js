const db = require('../helpers/database')
const helper = require('../helpers/helper')
const { listPerPage } = require('../../config/config')

async function getListChat(id_group, page) {
    try {
        const offset = helper.getOffset(page, listPerPage)
        const result = await db.execute(
            `SELECT 
            c.\`id\`, c.\`content\`, c.\`image\`, \`time\`,c.\`id_group\`, c.\`id_user\`, u.name, u.avatar
            FROM \`chat\` AS c
            INNER JOIN \`user\` AS u ON u.\`id\` = c.\`id_user\`
            WHERE c.id_group = '${id_group}'
            ORDER BY \`time\` DESC
            LIMIT ${offset}, ${listPerPage}`
            )
            const totalResult = await db.execute(`SELECT count(*) AS total FROM chat AS c INNER JOIN \`user\` AS u ON u.\`id\` = c.\`id_user\` WHERE c.id_group = '${id_group}'`)
            const total = totalResult[0].total;
        return {
            code: 200,
            data: result,
            meta: {
                page: page == null ? 1 : parseInt(page),
                total: total
            }
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
        var idChat =  await db.execute(`SELECT * FROM \`chat\` WHERE \`time\` = (SELECT MAX(\`time\`) FROM \`chat\`)`)

        return {
            code: 200,
            data: idChat,
        }
    } catch (error) {
        throw (error)
    }
}

async function deleteChat(id) {
    try {
        await db.execute(`UPDATE \`chat\` SET \`content\`='Đã xóa tin này',\`image\`='' WHERE id = "${id}"`)

        return {
            code: 200,
            data: "Đã xóa",
        }
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    getListChat,
    addChat,
    getLastChat,
    deleteChat
}