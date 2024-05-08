const { writeFileSync } = require('fs')
const express = require('express')
const app = express()
const { port, mySql } = require('./config/config')
const userRouter = require('./api/routers/user')
const imageRouter = require('./api/routers/image')
const groupRouter = require('./api/routers/group')
const chatRouter = require('./api/routers/chat')

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
app.use('/group',groupRouter)
app.use('/chat',chatRouter)


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


io.on('connection', (socket) => {
    console.log("Có một người dùng kết nối.");

    // Lắng nghe sự kiện 'disconnect'
    socket.on('disconnect', () => {
        console.log('Người dùng đã ngắt kết nối.');
        // Không cần phải xóa thông tin người dùng, vì nó đã tự động bị xóa khi kết nối socket đó bị đóng
    });

    // Lắng nghe sự kiện 'chat message'
    socket.on('chat message', (data) => {
        const { id, content,image, time,id_group,id_user,name,avatar} = data;
        console.log('Tin nhắn từ người dùng', id_user + ': ' + content);
        io.emit('chat message', {content,time,id_user,avatar,image,name,id_group}); 
    
    });
     // Lắng nghe sự kiện 'readMessage'
     socket.on('readMessage', (data) => {
        const {id_group,id_user,read_message} = data;     
        io.emit('readMessage',{id_group,id_user,read_message})
        console.log('Tin nhắn từ người dùng', id_user + ': ' + read_message);
    });

    
});


server.listen(port, () => {
    db.execute('SET GLOBAL event_scheduler="ON"')
    console.log(`App listening at http://${mySql.host}:${port}`)
})