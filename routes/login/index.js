// const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');  // mysql 모듈 로드
const session = require('express-session');
var MySQLStore = require("express-mysql-session")(session)
const conn = {  // mysql 접속 설정
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'kth'
};

var sessionStore = new MySQLStore(conn);
router.use(session({
    key:"session_cookie_name",
    secret:"session_cookie_secret",
    store:sessionStore,
    resave:false,
    saveUninitialized:false,
}))


router.get('/',(req,res,next)=>{
    // res.render('login',{title:'E'});
    if (!req.session.authenticate){
        return res.render('login')
    }
});

router.post('/',(req,res)=>{
    var u_id = req.body.u_id;
    var pwd = req.body.pwd;
    var connection = mysql.createConnection(conn); // DB 커넥션 생성
    var sessionStore = new MySQLStore({},connection);
    connection.connect();   // DB 접속  
    var sql = `SELECT * FROM members WHERE u_id ='${u_id}' AND pwd ='${pwd}';`
    connection.query(sql, function (err, results, fields) { // testQuery 실행
        if (err) {
            console.log(err);
            
        }
        req.session=results;
        
    });
    req.session.authenticate = true;
    // req.session.s_id=u_id;
    res.status(200).send({code: 1, msg:"its authenticated"});
    // res.json({ok:true})

    // res.status(200).send({code: 2, msg:"다시 한번 확인해주세요"});
    
});

module.exports = router;