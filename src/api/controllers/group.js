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

async function getListMember(id_group) {
    try {
        const result = await db.execute(
            `SELECT \`id\`, \`name\`, \`avatar\`
            FROM user 
            INNER JOIN member 
            WHERE 
            user.id = member.id_user 
            and member.id_group = '${id_group}';`)
        return {
            code: 200,
            data: result
        }
    } catch (error) {
        throw (error)
    }
}

async function createGroup(group) {
    try {
        await db.execute(
            `INSERT INTO \`group\`(\`id\`, \`name\`, \`image\`, \`id_user\`) 
            VALUES (
                uuid(),
                '${group.name}',
                '${group.image??""}',
                '${group.id_user}')`
                
        )    
        const result = await db.execute(
            `SELECT MAX(id) FROM \`group\` WHERE 1`)
        return {
            code: 200,
            data: result[0]
        }
    } catch (error) {
        throw (error)
    }
}

async function addMember(member) {
    try {
        await db.execute(
            `INSERT INTO \`member\`(\`id_user\`, \`id_group\`) 
            VALUES ('${member.id_user}','${member.id_group}')`
        )
        return {
            code: 200,
            data: 'Thêm thành viên thành công !'
        }
    } catch (error) {
        throw (error)
    }
}

async function deleteGroup(id) {
    try {
        await db.execute(
           `DELETE FROM \`group\` WHERE \`id\` = '${id}'`
        )
        return {
            code: 200,
            data: 'Xóa nhóm thành công!'
        }
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    getListGroup,
    getListMember,
    createGroup,
    addMember,
    deleteGroup
}