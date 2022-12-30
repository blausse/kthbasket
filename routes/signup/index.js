const express = require('express');
const router = express.Router();
const dbcon = require('../../dbcon');
const qs = require('querystring');

router.get('/',(req,res,next)=>{
    res.render('signup',{u_id:''});
});

module.exports = router;