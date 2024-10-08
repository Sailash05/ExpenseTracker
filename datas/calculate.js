const express = require('express');
const router = express.Router();

router.route('/')
.post((req,res) => {
    try{
        console.log(req.body);
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;