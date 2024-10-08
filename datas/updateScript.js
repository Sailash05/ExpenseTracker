const express = require('express');
const router = express.Router();
const users = require('../scheme/dataSchema.js');

router.route('/')
.post(async (req,res) => {
    try{
        await updateDB_func(req.body);
        res.status(200).json({msg: 'Successfully added in database'});
    }
    catch(err) {
        res.status(500).json({msg:'Failed to add data'});
    }
})

async function updateDB_func(data) {
    await users.create({
        title: data.in_title,
        amount: data.in_amount,
        option: data.in_option,
        reference: data.in_reference,
        typo: data.in_typo
    })
}

module.exports = router;