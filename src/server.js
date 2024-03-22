const { writeFileSync } = require('fs')
const express = require('express')
const app = express()
const { port, mySql } = require('./config/config')
const userRouter = require('./api/routers/user')
const imageRouter = require('./api/routers/image')
const messageRouter = require('./api/routers/message')
const db = require('./api/helpers/database')
const server = require('http').Server(app)
const io = require('socket.io')(server);

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

app.get('/', (req, res, next) => {
    res.json({ code: 200, message: "ok" })
})

// Router
app.use('/resources', express.static(__dirname + '/resources'))
app.use('/user', userRouter)
app.use('/image', imageRouter)
app.use('/message',messageRouter)

// Error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    // Cần thiết thì lấy thêm id của requst, chặn nó nếu spam request
    writeFileSync(
        './src/api/log/log.txt',
        `============================================================================
        ${Date()}
        message: ${err.message}
        stack: ${err.stack}\n`,
        { flag: 'a' }
    )
    res.status(statusCode).json({
        code: statusCode,
        message: err.message
    })
})

io.on('connection',function(socket){
    console.log("co thang ket noi");
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
})

server.listen(port, () => {
    db.execute('SET GLOBAL event_scheduler="ON"')
    console.log(`App listening at http://${mySql.host}:${port}`)
})