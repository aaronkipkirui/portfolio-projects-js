const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(event) {
    // prevent refresh on submit
    event.preventDefault();

    // get form values
    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    transactions.push({
        id:Date.now(),
        description,
        amount
    })
    localStorage.setItem("transactions", JSON.stringify(transactions));
    
    updateTransactionsList();
    updateSummary();

    transactionFormEl.reset(); 
}

function updateTransactionsList() {
    transactionListEl.innerHTML = "";

    const sortedTransactions = [...transactions].reverse();

    sortedTransactions.forEach((transaction) => {
        const transactionEl = createTransactionEl(transaction)
        transactionListEl.appendChild(transactionEl)
    })
}

function createTransactionEl(transaction) {
    const li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amount > 0 ? "income" : "expense");

    li.innerHTML = `
        <span>${transaction.description}</span>
        <span>
            ${transaction.amount}
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        </span>

    `;
    return li;
}

function updateSummary() {
    // reduce method takes acc (starting with 0 specified) and adds the values to it
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

    const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)

    // update ui
    balanceEl.textContent = balance;
    incomeAmountEl.textContent = income;
    expenseAmountEl.textContent = expense;
}