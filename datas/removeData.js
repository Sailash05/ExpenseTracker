const express = require('express');
const router = express.Router();

const users = require('../scheme/dataSchema.js');

router.route('/')
.post(async (req,res) => {
    try{
        await users.deleteOne({
            title: req.body.title,
            amount: req.body.amount,
            option: req.body.option,
            reference: req.body.reference,
            typo: req.body.typo
        });
        res.status(200).json({msg:"successfully deleted"});
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({msg:"problem"});
    }
    
})

module.exports = router;