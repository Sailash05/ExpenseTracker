const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const PORT = 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname,'./public')));
app.use(cors());

main().catch(err => console.error(err.message));

app.use('/api/updateData',require('./datas/updateScript.js'));
app.use('/api/getForIncome',require('./datas/getForIncomeScript.js'));
app.use('/api/getForExpense',require('./datas/getForExpenseScript.js'));
app.use('/api/removeData',require('./datas/removeData.js'));
app.use('/api/transaction',require('./datas/transactionScript.js'));
app.use('/',require('./route/root'));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/tracker');
}

app.listen(PORT, ()=> console.log(`Port running on ${PORT}`));