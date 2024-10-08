document.querySelector('.profile').addEventListener('mouseenter',function() {
    this.classList.add('animate');
    setTimeout( () => {
        this.classList.remove('animate');
    }, 2000);
});


const dashboard_element = document.querySelector('.dashboard_view');
const transaction_element = document.querySelector('.transaction_view');
const income_element = document.querySelector('.income_view');
const expense_element = document.querySelector('.expense_view');

async function toggle_func(choice){
    switch(choice)
    {
        case 'dashboard':
            dashboard_element.style.display = 'grid';
            transaction_element.style.display = 'none';
            income_element.style.display = 'none';
            expense_element.style.display = 'none';
            await dashboard_func();
            break;
        case 'transaction':
            dashboard_element.style.display = 'none';
            transaction_element.style.display = 'block';
            income_element.style.display = 'none';
            expense_element.style.display = 'none';
            await transaction_func();
            break;
        case 'income':
            dashboard_element.style.display = 'none';
            transaction_element.style.display = 'none';
            income_element.style.display = 'block';
            expense_element.style.display = 'none';
            await getForIncome_func();
            break;
        case 'expense':
            dashboard_element.style.display = 'none';
            transaction_element.style.display = 'none';
            income_element.style.display = 'none';
            expense_element.style.display = 'block';
            await getForExpense_func();
            break;
    }
}


async function setIncome_func(){
    const incomeTitle = document.querySelector('.income_form').querySelector('form').querySelector('.a');
    const incomeAmount = document.querySelector('.income_form').querySelector('form').querySelector('.b');
    const incomeOption = document.querySelector('.income_form').querySelector('form').querySelector('#income_option');
    const incomeReference = document.querySelector('.income_form').querySelector('form').querySelector('.c');
    if(incomeTitle.value.trim()!=='' && incomeAmount.value.trim()!=='' && incomeReference.value.trim()!=='')
    {
        try{
            const response = await fetch('http://localhost:4000/api/updateData',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    in_title: incomeTitle.value,
                    in_amount: incomeAmount.value,
                    in_option: incomeOption.value,
                    in_reference: incomeReference.value,
                    in_typo: 'income'
                })
            });
            if(response.ok) {
                //console.log("income data updated successfully");
            }
        }
        catch(err) {
            console.log(err);
        }
        incomeTitle.value = '';
        incomeAmount.value = '';
        incomeReference.value = '';
        await getForIncome_func();
    }
    else {

        /* 
        
        script for handling non entered values

        */

    }
}


async function getForIncome_func(){
    const incomeList = document.querySelector('.income_list');
    incomeList.innerHTML = '';
    try{
        const incomeTitle = document.querySelector('.show_income').querySelector('h2');
        const response = await fetch('http://localhost:4000/api/getForIncome');
        const recievedData = await response.json();
        for(let j=0;j<recievedData.length-1;j++)
        {
            let i=recievedData[j];
            incomeList.innerHTML += `
            <div class="income_list_data">
                        <img src="icons/income_icons/salary.png" alt="">
                        <div class="income_list_data_para">
                            <h3 class="income_list_data_title">${i.title}</h3>
                            <div class="center_part">
                                <p>₹${i.amount}</p>
                                <img src="icons/para_icons/type.png" alt="">
                                <p>${i.option}</p>
                                <img src="icons/para_icons/message.png" alt="">
                                <p>${i.reference}</p>
                            </div>
                        </div>
                        <p class="income_delete_btn" onclick="removeData_func(event,'income')"><img src="icons/para_icons/delete.png" alt=""></p>
                    </div>`
        }
        incomeTitle.textContent=`Total Income : ₹${recievedData[recievedData.length-1].totalIncome}`;
    }
    catch(err) {
        console.log(err);
    }
    finally{
        //await calculate('income');
    }
}


async function removeData_func(event,temp){
    const parent = event.currentTarget.parentElement;
    const title = parent.querySelector('.income_list_data_para').querySelector('.income_list_data_title').textContent;
    const paraList = parent.querySelector('.income_list_data_para').querySelector('.center_part').querySelectorAll('p');
    const amount = paraList[0].textContent;
    const option = paraList[1].textContent;
    const reference = paraList[2].textContent;
    const typo = temp;
    try{
        let tempStr = new String();
        for(let i=1;i<amount.length;i++)
        {
            tempStr+=amount[i];
        }
        const tempAmt = Number(tempStr);
        const response = await fetch('http://localhost:4000/api/removeData',{
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({
                title:title,
                amount:tempAmt,
                option:option,
                reference:reference,
                typo:typo
            })
        });
        await getForIncome_func();
    }
    catch(err){
        console.log(err);
    } 
}


async function setExpense_func(){
    const expenseTitle = document.querySelector('.expense_form').querySelector('form').querySelector('.a');
    const expenseAmount = document.querySelector('.expense_form').querySelector('form').querySelector('.b');
    const expenseOption = document.querySelector('.expense_form').querySelector('form').querySelector('#expense_option');
    const expenseReference = document.querySelector('.expense_form').querySelector('form').querySelector('.c');
    if(expenseTitle.value.trim()!=='' && expenseAmount.value.trim()!=='' && expenseReference.value.trim()!=='')
    {
        try{
            const response = await fetch('http://localhost:4000/api/updateData',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    in_title: expenseTitle.value,
                    in_amount: expenseAmount.value,
                    in_option: expenseOption.value,
                    in_reference: expenseReference.value,
                    in_typo: 'expense'
                })
            });
            if(response.ok) {
                /* console.log("data upadated successfully"); */
            }
        }
        catch(err) {
            console.log(err);
        }
        expenseTitle.value = '';
        expenseAmount.value = '';
        expenseReference.value = '';
        await getForExpense_func();
    }
    else {

        /* 
        
        script for handling non entered values

        */

    }
}


async function getForExpense_func(){
    const expenseList = document.querySelector('.expense_list');
    expenseList.innerHTML = '';
    try{
        const expenseTitle = document.querySelector('.show_expense').querySelector('h2');
        const response = await fetch('http://localhost:4000/api/getForExpense');
        const recievedData = await response.json();
        for(let j=0;j<recievedData.length-1;j++)
        {
            let i=recievedData[j];
            expenseList.innerHTML += `
            <div class="expense_list_data">
                        <img src="icons/income_icons/salary.png" alt="">
                        <div class="expense_list_data_para">
                            <h3 class="expense_list_data_title">${i.title}</h3>
                            <div class="center_part">
                                <p>₹${i.amount}</p>
                                <img src="icons/para_icons/type.png" alt="">
                                <p>${i.option}</p>
                                <img src="icons/para_icons/message.png" alt="">
                                <p>${i.reference}</p>
                            </div>
                        </div>
                        <p class="expense_delete_btn" onclick="removeDataForExp_func(event,'expense')"><img src="icons/para_icons/delete.png" alt=""></p>
                    </div>`
        }
        expenseTitle.textContent=`Total Expense : ₹${recievedData[recievedData.length-1].totalExpense}`;
    }
    catch(err) {
        console.log(err);
    }
    finally{
        //await calculate('expense');
    }
}



async function removeDataForExp_func(event,temp){
    const parent = event.currentTarget.parentElement;
    const title = parent.querySelector('.expense_list_data_para').querySelector('.expense_list_data_title').textContent;
    const paraList = parent.querySelector('.expense_list_data_para').querySelector('.center_part').querySelectorAll('p');
    const amount = paraList[0].textContent;
    const option = paraList[1].textContent;
    const reference = paraList[2].textContent;
    const typo = temp;
    try{
        let tempStr = new String();
        for(let i=1;i<amount.length;i++)
        {
            tempStr+=amount[i];
        }
        const tempAmt = Number(tempStr);
        const response = await fetch('http://localhost:4000/api/removeData',{
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({
                title:title,
                amount:tempAmt,
                option:option,
                reference:reference,
                typo:typo
            })
        });
        await getForExpense_func();
    }
    catch(err){
        console.log(err);
    } 
}


async function transaction_func(){
    try{
        const response = await fetch('http://localhost:4000/api/transaction');
        const recievedData = await response.json();
        const table = document.querySelector('table');
        table.innerHTML = `<tr>
                    <td>Sno</td>
                    <td>Title</td>
                    <td>Type</td>
                    <td>amount</td>
                </tr>`;
        for(let i=0;i<recievedData.length;i++){
            table.innerHTML += `<tr>
                    <td>${i+1}</td>
                    <td>${recievedData[i].title}</td>
                    <td>${recievedData[i].typo}</td>
                    <td>${recievedData[i].typo=="income"?'₹'+recievedData[i].amount:'-₹'+recievedData[i].amount}</td>
                </tr>`
        }
    }
    catch(err){
        console.log(err);
    }
}

async function dashboard_func(){
    const income = document.querySelector('.total_income').querySelector('h1');
    const expense = document.querySelector('.total_expense').querySelector('h1');
    const balance = document.querySelector('.total_balance').querySelector('h1');
    const minIncome = document.querySelector('.min_income');
    const maxIncome = document.querySelector('.max_income');
    const minExpense = document.querySelector('.min_expense');
    const maxExpense = document.querySelector('.max_expense');
    let balanceValue = 0;
    let total = 0;
    let incomeMin = 0;
    let incomeMax = 0;
    let expenseMin = 0;
    let expenseMax = 0;
    try{
        const response = await fetch('http://localhost:4000/api/getForIncome');
        const recievedData = await response.json();
        incomeMin = recievedData[0].amount;
        incomeMax = recievedData[0].amount;
        for(let i=0;i<recievedData.length-1;i++)
        {
            total += recievedData[i].amount;
            if(incomeMin>recievedData[i].amount)
            incomeMin=recievedData[i].amount;
            if(incomeMax<recievedData[i].amount)
            incomeMax=recievedData[i].amount;
        }
        balanceValue += total;
        income.textContent=`₹${total}`;
        minIncome.textContent=`₹${incomeMin==undefined?'0':incomeMin}`;
        maxIncome.textContent=`₹${incomeMax==undefined?'0':incomeMax}`;
    }
    catch(err){
        console.log(err);
    }
    try{
        const response = await fetch('http://localhost:4000/api/getForExpense');
        const recievedData = await response.json();
        expenseMin = recievedData[0].amount;
        expenseMax = recievedData[0].amount;
        total = 0;
        for(let i=0;i<recievedData.length-1;i++)
        {
            total += recievedData[i].amount;
            if(expenseMin>recievedData[i].amount)
            expenseMin=recievedData[i].amount;
            if(expenseMax<recievedData[i].amount)
            expenseMax=recievedData[i].amount;
        }
        balanceValue -= total;
        expense.textContent=`₹${total}`;
    }
    catch(err){
        console.log(err);
    }
    if(balanceValue>=0){
        balance.textContent=`₹${balanceValue}`;
        balance.style.color = 'rgb(0, 247, 4)';
    }
    else{
        balance.textContent=`-₹${Math.abs(balanceValue)}`;
        balance.style.color = 'red';
    }
    minExpense.textContent=`₹${expenseMin==undefined?'0':expenseMin}`;
    maxExpense.textContent=`₹${expenseMax==undefined?'0':expenseMax}`;
    try{
        const firstHistory = document.querySelector('.first_history');
        const secondHistory = document.querySelector('.second_history');
        const thirdHistory = document.querySelector('.third_history');
        const response = await fetch('http://localhost:4000/api/transaction');
        const recievedData = await response.json();
        if(recievedData.length>=3)
        {
            firstHistory.innerHTML = `<p>${recievedData[recievedData.length-1].title}</p><p>${recievedData[recievedData.length-1].typo=="income"?'₹'+recievedData[recievedData.length-1].amount:'-₹'+recievedData[recievedData.length-1].amount}</p>`;
            if(recievedData[recievedData.length-1].typo=="income")
            firstHistory.style.color='rgb(0, 247, 4)';
            else
            firstHistory.style.color='red';
            firstHistory.style.backgroundColor='white';
            firstHistory.style.border='solid 2px rgb(255, 226, 226)';


            secondHistory.innerHTML = `<p>${recievedData[recievedData.length-2].title}</p><p>${recievedData[recievedData.length-2].typo=="income"?'₹'+recievedData[recievedData.length-2].amount:'-₹'+recievedData[recievedData.length-2].amount}</p>`;
            if(recievedData[recievedData.length-2].typo=="income")
            secondHistory.style.color='rgb(0, 247, 4)';
            else
            secondHistory.style.color='red';
            secondHistory.style.backgroundColor='white';
            secondHistory.style.border='solid 2px rgb(255, 226, 226)';


            thirdHistory.innerHTML = `<p>${recievedData[recievedData.length-3].title}</p><p>${recievedData[recievedData.length-3].typo=="income"?'₹'+recievedData[recievedData.length-3].amount:'-₹'+recievedData[recievedData.length-3].amount}</p>`;
            if(recievedData[recievedData.length-3].typo=="income")
            thirdHistory.style.color='rgb(0, 247, 4)';
            else
            thirdHistory.style.color='red';
            thirdHistory.style.backgroundColor='white';
            thirdHistory.style.border='solid 2px rgb(255, 226, 226)';
        }
        else if(recievedData.length==2)
        {
            console.log("hello");
            firstHistory.innerHTML = `<p>${recievedData[recievedData.length-1].title}</p><p>${recievedData[recievedData.length-1].typo=="income"?'₹'+recievedData[recievedData.length-1].amount:'-₹'+recievedData[recievedData.length-1].amount}</p>`;
            if(recievedData[recievedData.length-1].typo=="income")
            firstHistory.style.color='rgb(0, 247, 4)';
            else
            firstHistory.style.color='red';
            firstHistory.style.backgroundColor='white';
            firstHistory.style.border='solid 2px rgb(255, 226, 226)';


            secondHistory.innerHTML = `<p>${recievedData[recievedData.length-2].title}</p><p>${recievedData[recievedData.length-2].typo=="income"?'₹'+recievedData[recievedData.length-2].amount:'-₹'+recievedData[recievedData.length-2].amount}</p>`;
            if(recievedData[recievedData.length-2].typo=="income")
            secondHistory.style.color='rgb(0, 247, 4)';
            else
            secondHistory.style.color='red';
            secondHistory.style.backgroundColor='white';
            secondHistory.style.border='solid 2px rgb(255, 226, 226)';

            thirdHistory.innerHTML = `<p>Freelancing</p><p>₹400</p>`;
            thirdHistory.style.border = 'none';
            thirdHistory.style.color='rgb(245, 245, 245)';
            thirdHistory.style.backgroundColor = 'rgb(245, 245, 245)';
        }
        else if(recievedData.length==1)
        {
            firstHistory.innerHTML = `<p>${recievedData[recievedData.length-1].title}</p><p>${recievedData[recievedData.length-1].typo=="income"?'₹'+recievedData[recievedData.length-1].amount:'-₹'+recievedData[recievedData.length-1].amount}</p>`;
            if(recievedData[recievedData.length-1].typo=="income")
            firstHistory.style.color='rgb(0, 247, 4)';
            else
            firstHistory.style.color='red';
            firstHistory.style.backgroundColor='white';
            firstHistory.style.border='solid 2px rgb(255, 226, 226)';


            secondHistory.innerHTML = `<p>Freelancing</p><p>₹400</p>`;
            secondHistory.style.border = 'none';
            secondHistory.style.color='rgb(245, 245, 245)';
            secondHistory.style.backgroundColor = 'rgb(245, 245, 245)';


            thirdHistory.innerHTML = `<p>Freelancing</p><p>₹400</p>`;
            thirdHistory.style.border = 'none';
            thirdHistory.style.color='rgb(245, 245, 245)';
            thirdHistory.style.backgroundColor = 'rgb(245, 245, 245)';
        }
        else
        {
            firstHistory.innerHTML = `<p>Freelancing</p><p>₹400</p>`;
            firstHistory.style.border = 'none';
            firstHistory.style.color='rgb(245, 245, 245)';
            firstHistory.style.backgroundColor = 'rgb(245, 245, 245)';

            secondHistory.innerHTML = `<p>Freelancing</p><p>₹400</p>`;
            secondHistory.style.border = 'none';
            secondHistory.style.color='rgb(245, 245, 245)';
            secondHistory.style.backgroundColor = 'rgb(245, 245, 245)';


            thirdHistory.innerHTML = `<p>Freelancing</p><p>₹400</p>`;
            thirdHistory.style.border = 'none';
            thirdHistory.style.color='rgb(245, 245, 245)';
            thirdHistory.style.backgroundColor = 'rgb(245, 245, 245)';
        }
    }
    catch(err){
        console.log(err);
    }
}

async function temp_func()
{
    await dashboard_func();
}
temp_func();