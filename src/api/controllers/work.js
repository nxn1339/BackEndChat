const db = require('../helpers/database')

async function getWorkGroup(id_group) {
    try {
        const data = await db.execute(
            `SELECT \`id\`,\`name\`,\`id_user\`,\`id_group\` FROM \`work\` WHERE id_group = '${id_group}'`
        )

        return {
            code: 200,
            data: data
        }
    } catch (error) {
        throw error
    }
}


async function updateWorkGroup(work) {
    try {
        const data = await db.execute(
            `UPDATE \`work\` SET \`name\`='${work.name}' WHERE id = '${work.id}'`
        )

        return {
            code: 200,
            data: data
        }
    } catch (error) {
        throw error
    }
}

async function addWorkGroup(work) {
    try {
        const data = await db.execute(
            `INSERT INTO \`work\`(\`id\`, \`name\`, \`id_user\`, \`id_group\`) 
            VALUES (
                uuid(),
                '${work.name}',
                '${work.id_user}',
                '${work.id_group}')`
        )

        return {
            code: 200,
            data: data
        }
    } catch (error) {
        throw error
    }
}

async function deleteWorkGroup(id_work) {
    try {
       await db.execute(
            `DELETE FROM \`work\` WHERE id = '${id_work}'`
        )

        return {
            code: 200,
            data: 'Xóa thành công !'
        }
    } catch (error) {
        throw error
    }
}



async function getReportGroup(id_work) {
    try {
        const data = await db.execute(
            `SELECT 
                report.\`id\`, 
                report.\`name\`, 
                report.\`percent\`, 
                report.\`work_time\`, 
                report.\`id_work\`, 
                report.\`update_at\`, 
                user.\`name\` as name_user, 
                report.\`id_user\` 
             FROM \`report\` 
             INNER JOIN \`user\` ON report.\`id_user\` = user.\`id\` 
             WHERE report.\`id_work\` = '${id_work}'`
        );

        return {
            code: 200,
            data: data
        };
    } catch (error) {
        throw error;
    }
}


async function updateReportGroup(report) {
    try {
        const data = await db.execute(
            `UPDATE \`report\` SET \`name\`='${report.name}',\`percent\`='${report.percent}',\`work_time\`='${report.work_time}' WHERE id = '${report.id}'`
        )

        return {
            code: 200,
            data: data
        }
    } catch (error) {
        throw error
    }
}

async function addReportGroup(report) {
    try {
        const data = await db.execute(
            `INSERT INTO \`report\` (\`id\`, \`name\`, \`percent\`, \`work_time\`, \`id_work\`, \`id_user\`) 
            VALUES (
                uuid(),
                '${report.name}',
                '${report.percent}',
                '${report.work_time}',
                '${report.id_work}',
                '${report.id_user}'
            );`
        );

        return {
            code: 200,
            data: data
        };
    } catch (error) {
        throw error;
    }
}


async function deleteReportGroup(id_report) {
    try {
         await db.execute(
            `DELETE FROM \`report\` WHERE id = '${id_report}'`
        )

        return {
            code: 200,
            data: "Xóa group thành công!"
        }
    } catch (error) {
        throw error
    }
}



module.exports = {
    getWorkGroup,
    getReportGroup,
    deleteWorkGroup,
    deleteReportGroup,
    updateWorkGroup,
    updateReportGroup,
    addWorkGroup,
    addReportGroup
}