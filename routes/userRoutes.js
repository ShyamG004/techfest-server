const express=require('express');
const {validateUser} =require('../controller/userController')
const router=express.Router();

router.get('/validateuser',validateUser);

module.exports=router;