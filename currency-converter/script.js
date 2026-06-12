const converterForm = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

window.addEventListener("load", fetchCurrencies);
converterForm.addEventListener("submit", convertCurrency);

// https://api.exchangerate-api.com/v4/latest/USD
async function fetchCurrencies() {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();

    const currencyOptions = Object.keys(data.rates);
    currencyOptions.forEach(currency => {
        const fromOption = document.createElement("option");
        fromOption.value = currency;
        fromOption.textContent = currency;
        fromCurrency.appendChild(fromOption);

        const toOption = document.createElement("option");
        toOption.value = currency;
        toOption.textContent = currency;
        toCurrency.appendChild(toOption);
    })
}

async function convertCurrency(event) {
    // stop page from refreshing on submit
    event.preventDefault();
    const amount = parseFloat(amountInput.value);
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;

    if (amount < 0) {
        alert("Please enter a valid amount");
        return;
    }
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`);
    const data = await response.json();

    const rate = data.rates[toCurrencyValue];
    const convertedAmount = (amount * rate).toFixed(2);

    resultDiv.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;

}