const db = require('../helpers/database')

async function getListGroup(type,id_user,keyword) {
    try {
        const result = await db.execute(
            `SELECT g.id, g.id_user as Owner, g.image, g.name, g.type
                FROM \`group\` AS g 
                INNER JOIN member AS m ON g.id = m.id_group 
                WHERE m.id_user = '${id_user}' AND g.type = '${type}' AND g.name LIKE '%${keyword ?? ''}%' ORDER BY g.created_at ASC`)
  
        return {
            code: 200,
            data: result
        };
    } catch (error) {
        throw (error);
    }
}


async function getListMember(id_group) {
    try {
        const result = await db.execute(
            `SELECT user.id, user.name, user.avatar
            FROM user 
            INNER JOIN member 
            ON user.id = member.id_user 
            WHERE member.id_group = '${id_group}';`);
        return {
            code: 200,
            data: result
        };
    } catch (error) {
        throw (error);
    }
}



async function createGroup(group) {
    try {      
            await db.execute(
                `INSERT INTO \`group\`(\`id\`, \`name\`, \`image\`, \`id_user\`, \`type\`, \`id_user_single\`) 
                VALUES (
                    uuid(),
                    '${group.name}',
                    '${group.image ?? ""}',
                    '${group.id_user}',
                    '${group.type}',
                    '${group.id_user_single}')`
            );
    
            const result = await db.execute(
                `SELECT MAX(id) FROM \`group\` WHERE 1`
            );
            return {
                code: 200,
                data: result[0]
            };    
      
    } catch (error) {
        throw error;
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

async function deleteMember(id_user, id_group) {
    try {
        await db.execute(
           `DELETE FROM \`member\` WHERE \`id_user\` = '${id_user}' AND \`id_group\` = '${id_group}'`
        );
        return {
            code: 200,
            data: 'Xóa nhóm thành công!'
        };
    } catch (error) {
        throw error;
    }
}

async function updateReadMessage(member) {
    try {      
            await db.execute(
                `UPDATE \`member\` SET \`read_message\`='0' WHERE id_group = '${member.id_group}' and id_user = '${member.id_user}' `
             )
        return {
            code: 200,
            data: 'Đã đọc tin nhắn này!'
        }
    } catch (error) {
        throw (error)
    }
}

async function getStatusMessage(id_user,id_group) {
    try {
        const result = await db.execute(
            `SELECT id_user, id_group, read_message 
            FROM \`member\` WHERE \`id_user\` = '${id_user}' and \`id_group\`= '${id_group}'`)
        return {
            code: 200,
            data: result
        }
    } catch (error) {
        throw (error)
    }
}

async function updateGroup(group) {
    try {
        if(group.image!='' || group!=null){
            await db.execute(
                `UPDATE \`group\` SET           
                \`name\`='${group.name}',
                \`image\`='${group.image}',
                \`id_user\`='${group.id_user}' 
                WHERE id = '${group.id}'`
            )
        }
        else{
            await db.execute(
                `UPDATE \`group\` SET           
                \`name\`='${group.name}',
                \`id_user\`='${group.id_user}' 
                WHERE id = '${group.id}'`
            )
        }     
        return {
            code: 200,
            data: 'Cập nhật nhóm thành công!'
        }
    } catch (error) {
        throw (error)
    }
}

async function checkSingleGroup(id_user1,id_user2) {
    try {
        const result = await db.execute(
            `SELECT COUNT(*) as cnt FROM \`group\`
            WHERE (\`id_user\` = '${id_user1}' AND \`id_user_single\` = '${id_user2}' AND \`type\` = 1)
               OR (\`id_user\` = '${id_user2}' AND \`id_user_single\` = '${id_user1}' AND \`type\` = 1) AND \`type\` = 1 ;`)
        return {
            code: 200,
            data: result
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
    deleteGroup,
    deleteMember,
    updateReadMessage,
    getStatusMessage,
    updateGroup,
    checkSingleGroup
}