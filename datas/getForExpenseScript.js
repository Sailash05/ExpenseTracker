const express = require('express');
const router = express.Router();
const users = require('../scheme/dataSchema.js');

router.route('/')
.get(async (req,res) => {
    try{
        let totalExpense = 0;
        const recievedData = await users.find({typo:'expense'});
        for(let i=0;i<recievedData.length;i++)
        {
            totalExpense += recievedData[i].amount;
        }
        const tempObj = {totalExpense:totalExpense};
        recievedData.push(tempObj);
        res.status(200).json(recievedData);
    }
    catch(err) {
        res.status(500).json({msg:"error occures"});
    }
})

module.exports = router;