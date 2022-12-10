const fromCurrencyInput = document.querySelector('.fromCurrencyInput');
const toCurrencyInput = document.querySelector('.toCurrencyInput');
const currencyFromSelection = document.querySelector('.fromCurrencySelection');
const currencyToSelection = document.querySelector('.currencyToSelection');
let allFromCurrenciesButtons = document.querySelectorAll('.currency-code-from');
let allToCurrenciesButtons = document.querySelectorAll('.currency-code-to');
const rateFrom = document.querySelector('.rateFrom');
const rateTo = document.querySelector('.rateTo');
let fromCurrency = "RUB";
let toCurrency = "USD";
let price = 0;
// --------------------------------------------------------------------------------- //
// ------------------------------- Getting Remote Rates ---------------------------- //
// --------------------------------------------------------------------------------- //
function getCurrencies(from, to) {
    return fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data.rates[to]
        })
        .catch (error => {
            alert("Oops! Something wrong. " + error)
        })
}

getCurrencies(fromCurrency,toCurrency)
    .then(result => {
        price = +result.toFixed(4);
        toCurrencyInput.value = price;
        rateFrom.textContent = `1 ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        rateTo.textContent = `1 ${toCurrency} = ${(1 / result).toFixed(2)} ${fromCurrency}`;
    })
// --------------------------------------------------------------------------------- //
// ----------------------------- Typing Amount User Has ---------------------------- //
// --------------------------------------------------------------------------------- //
fromCurrencyInput.addEventListener("input", (e) => {
    if (fromCurrencyInput.value.length > 10) {
        e.target.value = e.target.value.substr(0,10);
    } else if (fromCurrency == toCurrency) {  // if currencies are equal -> not fetch
        rateFrom.textContent = `1 ${fromCurrency} = 1 ${toCurrency}`;
        rateTo.textContent = `1 ${toCurrency} = 1 ${fromCurrency}`;
        toCurrencyInput.value = fromCurrencyInput.value ;
    } else {
        toCurrencyInput.value = +(e.target.value * price).toFixed(4);
    }
})
// ---------------------------------------------------------------------------------- //
// ----------------------------- Typing Amount User Wants --------------------------- //
// ---------------------------------------------------------------------------------- //
toCurrencyInput.addEventListener("input", (e) => {
    if (toCurrencyInput.value.length > 10) {
        e.target.value = e.target.value.substr(0,10);
    } else if (fromCurrency == toCurrency) {   // if currencies are equal -> not fetch
        rateFrom.textContent = `1 ${fromCurrency} = 1 ${toCurrency}`;
        rateTo.textContent = `1 ${toCurrency} = 1 ${fromCurrency}`;
        fromCurrencyInput.value = toCurrencyInput.value ;
    } else {
        fromCurrencyInput.value = +(e.target.value / price).toFixed(4);
    }
})
// ---------------------------------------------------------------------------------------------- //
// ---------------------------- Selecting Currency User Wants To Convert ------------------------ //
// ---------------------------------------------------------------------------------------------- //
currencyFromSelection.addEventListener("click", (e) => {
    if (!e.target.matches(".currency-code-from")) {
        return;
    } 
    for (let i = 0; i < allFromCurrenciesButtons.length; i++) {
        allFromCurrenciesButtons[i].classList.remove('selected-currency-button');
    }
    allFromCurrenciesButtons[0].classList.remove("currency-selected-by-default")
    e.target.classList.toggle('selected-currency-button');
    fromCurrency = e.target.textContent;

    if (fromCurrency == toCurrency) {     // if currencies are equal -> not fetch
        rateFrom.textContent = `1 ${fromCurrency} = 1 ${toCurrency}`;
        rateTo.textContent = `1 ${toCurrency} = 1 ${fromCurrency}`;
        toCurrencyInput.value = fromCurrencyInput.value ;
        return ""
    } 
 
    getCurrencies(fromCurrency,toCurrency)
        .then(result => {
            price = +result.toFixed(4);
            rateFrom.textContent = `1 ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
            rateTo.textContent = `1 ${toCurrency} = ${(1 / result).toFixed(2)} ${fromCurrency}`;
            toCurrencyInput.value = +(fromCurrencyInput.value * price).toFixed(4);
        })
})
// ---------------------------------------------------------------------------------------------- //
// ---------------------------- Selecting Currency User Wants To Obtain ------------------------ //
// --------------------------------------------------------------------------------------------- //
currencyToSelection.addEventListener("click", (e) => {
    if (!e.target.matches(".currency-code-to")) {
        return;
    }
    for (let i = 0; i < allToCurrenciesButtons.length; i++) {
        allToCurrenciesButtons[i].classList.remove('selected-currency-button');
    }
    allToCurrenciesButtons[1].classList.remove("currency-selected-by-default")
    e.target.classList.toggle('selected-currency-button');
    toCurrency = e.target.textContent;

    if (fromCurrency == toCurrency) {   // if currencies are equal -> not fetch
        rateFrom.textContent = `1 ${fromCurrency} = 1 ${toCurrency}`;
        rateTo.textContent = `1 ${toCurrency} = 1 ${fromCurrency}`;
        fromCurrencyInput.value = toCurrencyInput.value ;
        return ""
    } 

    getCurrencies(fromCurrency,toCurrency)
    .then(result => {
        price = +result.toFixed(4);
        fromCurrencyInput.value =  +(price * toCurrencyInput.value).toFixed(4);
        rateFrom.textContent = `1 ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        rateTo.textContent = `1 ${toCurrency} = ${(1 / result).toFixed(2)} ${fromCurrency}`;

    })
})

