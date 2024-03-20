const db = require('../helpers/database')

async function getResultPackage(packageId, answer) {
    let result = {}
    let base = {
        most: {},
        least: {}
    }
    let field = []

    for (let i = 0; i < answer.length; i++) {
        const element = answer[i][0];
        if (base.most[`${element.most}`] == null) {
            base.most[`${element.most}`] = 1
        }
        if (base.least[`${element.least}`] == null) {
            base.least[`${element.least}`] = 1
        }
        base.most[`${element.most}`] += 1
        base.least[`${element.least}`] += 1
    }

    switch (packageId) {
        //DISC
        case "74c8329e-85e7-11ee-b0fc-089798d3":
            let baseDISC = {
                1: 'D',
                2: 'I',
                3: 'S',
                4: 'C'
            }
            let value = {
                most: {
                    1: 20,
                    2: 18,
                    3: 19,
                    4: 15,
                    5: 24
                },
                least: {
                    1: 21,
                    2: 19,
                    3: 19,
                    4: 16,
                    5: 21
                }
            }

            delete base.most['5']
            delete base.least['5']
            for (let i = 1; i < 5; i++) {
                base.most[`${i}`] = `${(base.most[`${i}`] / value.most[`${i}`] * 100).toFixed(2)}%`
                base.least[`${i}`] = `${(base.least[`${i}`] / value.least[`${i}`] * 100).toFixed(2)}%`
                if (base.most[`${i}`] < base.least[`${i}`]) {
                    let temp = base.most[`${i}`]
                    base.most[`${i}`] = base.least[`${i}`]
                    base.least[`${i}`] = temp
                }
            }
            const mostPercentages = Object.entries(base.most);
            const sortedMostPercentages = mostPercentages.sort((a, b) => {
                return parseFloat(b[1]) - parseFloat(a[1])
            });
            const top2Most = sortedMostPercentages.slice(0, 2).map(item => parseInt(item[0]))

            if (base.most[`${top2Most[0]}`] >= '60%') {
                let [element] = await db.execute(
                    `SELECT *
                    FROM \`personality\`
                    WHERE \`id\`='${baseDISC[top2Most[0]]}'`
                )
                let rows = await db.execute(
                    `SELECT \`field\`.\`id\`, \`field\`.\`name\`
                    FROM \`field_personality\`
                    INNER JOIN \`field\` ON \`field_personality\`.\`field_id\`=\`field\`.id
                    WHERE \`field_personality\`.\`personality_id\`='${baseDISC[top2Most[0]]}'`
                )
                result = element
                field = rows
                break
            }
            let idPersonality = `${baseDISC[top2Most[0]]}${baseDISC[top2Most[1]]}`
            switch (idPersonality) {
                case 'DC':
                    idPersonality = 'CD'
                    break
                case 'ID':
                    idPersonality = 'DI'
                    break
                case 'SD':
                    idPersonality = 'DS'
                    break
                case 'CI':
                    idPersonality = 'IC'
                    break
                case 'SI':
                    idPersonality = 'IS'
                    break
                case 'CS':
                    idPersonality = 'SC'
                    break
                default:
                    break
            }
            let [element] = await db.execute(
                `SELECT *
                FROM \`personality\`
                WHERE \`id\`='${idPersonality}'`
            )
            let rows = await db.execute(
                `SELECT \`field\`.\`id\`, \`field\`.\`name\`
                FROM \`field_personality\`
                INNER JOIN \`field\` ON \`field_personality\`.\`field_id\`=\`field\`.id
                WHERE \`field_personality\`.\`personality_id\`='${idPersonality}'`
            )
            for (let i = 0; i < rows.length; i++) {
                const element = await db.execute(
                    `SELECT id, type, name
                    FROM \`specialized\`
                    WHERE \`field_id\`='${rows[i].id}'`
                );
                rows[i].specialized = element
            }
            result = element
            field = rows
            break

        default:
            var err = new Error('không thể xác định được gói câu hỏi!')
            err.statusCode = 404
            throw (err)
    }

    return {
        base,
        result,
        field
    }
}

module.exports = getResultPackage