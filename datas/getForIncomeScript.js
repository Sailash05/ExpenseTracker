const express = require('express');
const router = express.Router();
const users = require('../scheme/dataSchema.js');

router.route('/')
.get(async (req,res) => {
    try{
        let totalIncome = 0;
        const recievedData = await users.find({typo:'income'});
        for(let i=0;i<recievedData.length;i++)
        {
            totalIncome += recievedData[i].amount;
        }
        const tempObj = {totalIncome:totalIncome};
        recievedData.push(tempObj);
        res.status(200).json(recievedData);
    }
    catch(err) {
        res.status(500).json({msg:"error occures"});
    }
})

module.exports = router;