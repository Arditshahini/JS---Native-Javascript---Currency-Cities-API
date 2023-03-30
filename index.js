const api = "https://api.exchangerate-api.com/v4/latest/USD";

const search = document.querySelector(".searchBox");
const convert = document.querySelector(".convert");
const fromCurrecy = document.querySelector(".from");
const toCurrecy = document.querySelector(".to");
const finalValue = document.querySelector(".result");
const finalAmount = document.getElementById("finalAmount");


fromCurrecy.addEventListener('change', (event) => {
    resultFrom = `${event.target.value}`;
});


toCurrecy.addEventListener('change', (event) => {
    resultTo = `${event.target.value}`;
});

search.addEventListener('input', updateValue);

// funktion för att uppdatera värde
function updateValue(e) {
    searchValue = e.target.value;
}

// när man trycker på knappen så hämtar den resultatet
convert.addEventListener("click", getResults);

// funktion för att få resultat
function getResults() {
    fetch(`${api}`)
        .then(currency => {
            return currency.json();
        }).then(displayResults);
}

// visar resultatet efter växlingen
function displayResults(currency) {
    let fromRate = currency.rates[resultFrom];
    let toRate = currency.rates[resultTo];
    finalValue.innerHTML =
        ((toRate / fromRate) * searchValue).toFixed(2);
    finalAmount.style.display = "block";
}

// ifall användaren vill avbryta, rensa ifyllda valutor eller uträkning
function rensa() {
    window.location.reload();
    document.querySelector("rensa").innerHTML = "";
};




