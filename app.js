const express = require('express');
const app = express();
const port = 3001;
const routes = require('./routes')
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const path = require('path')
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 
// const static = require('serve-static')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));

app.use('/',routes);
app.post('/write', function(req, res){
    res.send('전송완료')
  });
// app.use('/',static(path.join(__dirname,'html')))
app.use(express.static('public'))

let rooms = [];

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + 'index.html');
// });

io.on('connection', (socket)=>{
    socket.on('request_message', (msg) => {
        // response_message로 접속중인 모든 사용자에게 msg 를 담은 정보를 방출한다.
        io.emit('response_message', msg);
    });

    // 방참여 요청
    socket.on('req_join_room', async (msg) => {
        let roomName = 'Room_' + msg;
        if(!rooms.includes(roomName)) {
            rooms.push(roomName);
            
        }else{
            
        }
        socket.join(roomName);
        io.to(roomName).emit('noti_join_room', "~님이 "+`${roomName}`+" 에 입장하였습니다.");
    });

    // 채팅방에 채팅 요청
    socket.on('req_room_message', async(msg) => {
        let userCurrentRoom = getUserCurrentRoom(socket);
        io.to(rooms).emit('noti_room_message', msg);
    });

    socket.on('disconnect', async () => {
        console.log('user disconnected');
        io.to(rooms).emit('noti_room_message', "~님이 퇴장하였습니다.");
    });
});


// TEST CODE GOES HERE
(async function(){
})();

function getUserCurrentRoom(socket){
    
    let currentRoom = '';
    let socketRooms = Object.keys(socket.rooms);

    for (let i = 0; i < socketRooms.length; i++){
        if(socketRooms[i].indexOf('Room_') !== -1){
            currentRoom = socketRooms[i];
            break;
        }
    }
    return currentRoom;
}


http.listen(port,()=>{
    console.log('express webserver start! :: 3001')
})

// app.get('/',(req,res)=>{
//     res.send('안녕')
// })

// app.listen(port,()=>{
//     console.log(`서버에 연결되었습니다. http://localhost:${port}`)
// })