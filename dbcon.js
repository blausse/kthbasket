const mysql = require('mysql');  // mysql 모듈 로드
// const id = document.querySelector('#u_id');
// const pwd = document.querySelector('#pwd');
// const bodyParser= require('body-parser')

const conn = {  // mysql 접속 설정
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'kth'
};
// app.use(bodyParser.urlencoded({extended: true})) 
// app.post('/add', function(req, res){
//     res.send('전송완료')
//   });
var connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();   // DB 접속
 
// var testQuery = "INSERT INTO `members` (`username`,`password`) VALUES ('test2','test2');";
 
// connection.query(testQuery, function (err, results, fields) { // testQuery 실행
//     if (err) {
//         console.log(err);
//     }
//     console.log(results);
// });
 
// var testQuery = "SELECT * FROM MEMBERS";
 
// connection.query(testQuery, function (err, results, fields) { // testQuery 실행
//     if (err) {
//         console.log(err);
//     }
//     console.log(results);
// });
 
 
module.exports = connection;