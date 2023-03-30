const button = document.querySelector('#postSubmit');
const results = document.getElementById('result');
const idInput = document.querySelector('#id');
const nameInput = document.querySelector('#name');
const populationInput = document.querySelector('#population');


function editRow(id, name, population) {

    idInput.value = id
    nameInput.value = name
    populationInput.value = population
    button.value = "Ändra" //när man tryckt på ÄNDRA knappen ändras value (namnet) för knappen från "Lägg till" till "Ändra"
}
async function deleteRow(id) {
    await fetch('https://avancera.app/cities/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }).catch(error => console.log(error));
    stad() //Reloadar hemsidan direkt
}

function stad() {
    let dataUrl = "https://avancera.app/cities/?name=";
    fetch(dataUrl)

        .then(response => response.json())
        .then((data) => {
            let innerHTML =
                /* Har gjort så att det är en table head med titlarna, och sedan har jag enbart gjort rows där dataforeach ger ut alla en och en UTAN TITLAR , liknar mer en lista. */

                /* Har även lagt till 2 knappar i Table där man kan ändra eller radera  */
                `
            <table class="styled-table">
          <thead>
              <tr>
                  <th>Namn</th> 
                  <th>Folkmängd</th>
                  <th>ID</th>
                  <th>Ändra</th>
                  <th>Radera</th>
                  
              </tr>
          </thead>
          <tbody>`
            data.forEach(stad => {
                innerHTML +=
        `<tr>
            <td>${stad.name}</td> 
            <td>${stad.population}</td>
            <td>${stad.id}</td>
            <td>
            <button type="btn"  onclick="editRow('${stad.id}','${stad.name}','${stad.population}')">Ändra</button>
            </td>
            <td>
            <button type="btn"  onclick="deleteRow('${stad.id}')">X</button>
            </td>
        </tr>`
                    
            })

            innerHTML += 
            `</tbody>
            </table>`
              

            results.innerHTML = innerHTML
        });

    // dessa 3 rader gör så att alla inputs är tomma efter varje körd aktivitet
    idInput.value = ""
    nameInput.value = ""
    populationInput.value = ""
    button.value = "Lägg till"
}



/* För att underlätta och skriva mindre kod använde jag mig av Conditional Ternary där jag låter en Condition antingen vara Truthy eller Falsy. Dvs ifall jag vill ändra data, ska det finnas ett ID i ID input - men glöm inte att den är osynlig på hemsidan pga style=hidden!!! annars så kommer den att lägga till en sida*/

/* När jag väl trycker på "Ändra" knappen så kommer den att skriva in all data som jag fetchar dvs id,name,population i input tack vare min funktion editRow */


/* ASYNC AWAIT - Anledningen till att jag använde mig av async och await är att det blir ansynkront. Await väntar på ett promise/resultatet av en async-funktion till dess att detta promise har uppfyllts. 

Det som async nyckelordet försäkrar att funktionen alltid returnerar en promise objekt.
  */

const thisForm = document.getElementById('myForm');

thisForm.addEventListener('submit', async function (e) {
    e.preventDefault(); //förhindrar från att sidan laddas om

    /*Skapade en variabel "entries", där jag angav funktionen thisForm+entries (inputs)
      Sedan angav jag data själva entries värdet. */

    const entries = new FormData(thisForm).entries()
    const data = Object.fromEntries(entries)

    // konverterade data population(string) till nummer (integer) "pasreInt" 
    data.population = parseInt(data.population)

    // Skapade en variabel Change där själva ternary funktionen aktiveras via en IF sats. 

    const change = data.id !== ""
    if (!change) {
        delete data.id
    }
    // console.log(data)
    /*I denna fetch funktion har jag angivit själva Conditional ternary truthy eller falsy.
    Dvs om du har en condition så använder den ("skriver in") ID för att göra en PUT eller så kommer den att lägga till (POST) för att det är tomt i ID
    */
    await fetch('https://avancera.app/cities/' + (change ? data.id : ""), {
        method: change ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).catch(error => console.log(error));
   

    stad() //reloadar hemsidan direkt efter PUT/POST


});

/* stad() gör så att API- listan syns automatiskt i början när sidan laddas eller efter utförd aktivitet */
stad()

