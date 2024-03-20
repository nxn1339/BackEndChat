const mysql = require('mysql2/promise');
const config = require('../../config/config');

const pool = mysql.createPool(config.mySql);

async function execute(sql, params) {
    const [results] = await pool.execute(sql, params);
    return results;
}

async function queryMultiple(sqlList, params) {
    const conn = await pool.getConnection();

    const result = [];

    for (let i = 0; i < sqlList.length; i++) {
        const [element] = await conn.query(sqlList[i], params)
        result.push(element);
    }

    conn.release();
    return result;

}

module.exports = {
    execute,
    queryMultiple
}