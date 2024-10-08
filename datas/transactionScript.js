const express = require('express');
const router = express.Router();
const users = require('../scheme/dataSchema.js');

router.route('/')
.get(async (req,res) => {
    try{
        const data = await users.find();
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json({msg:"error occures"});
    }
})

module.exports = router;