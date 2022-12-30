const express = require('express');
const app = express();
const port = 3001;
const routes = require('./routes')
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const path = require('path');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session)
const conn = {  // mysql 접속 설정
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'kth'
};

app.use(session({
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized:true,
    store: new mysqlStore(conn)
}));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
app.use(express.static('public'))
app.use('/',routes);

//채팅 기능
    let rooms = [];
    io.on('connection', (socket)=>{
        socket.on('request_message', (msg) => {
            // response_message로 접속중인 모든 사용자에게 msg 를 담은 정보를 방출한다.
            io.emit('response_message', msg);
        });
    
        // 방참여 요청
        socket.on('req_join_room', async (msg) => {
            let roomName = msg;
            if(!rooms.includes(roomName)) {
                rooms.push(roomName);
                
            }else{
                
            }
            socket.join(roomName);
            io.to(roomName).emit('noti_join_room',`${roomName} 에 입장하였습니다.`);
        });
    
        // 채팅방에 채팅 요청
        socket.on('req_room_message', async(msg) => {
            // let userCurrentRoom = getUserCurrentRoom(socket);
            io.to(rooms).emit('noti_room_message', msg);
        });
    
        socket.on('disconnect', async () => {
            console.log('user disconnected');
            io.to(rooms).emit('noti_room_message', "퇴장하였습니다.");
        });
    });


// TEST CODE GOES HERE
// (async function(){
// })();

// function getUserCurrentRoom(socket){
    
//     let currentRoom = '';
//     let socketRooms = Object.keys(socket.rooms);

//     for (let i = 0; i < socketRooms.length; i++){
//         if(socketRooms[i].indexOf('Room_') !== -1){
//             currentRoom = socketRooms[i];
//             break;
//         }
//     }
//     return currentRoom;
// }




http.listen(port,()=>{
    console.log('express webserver start! :: 3001')
})
