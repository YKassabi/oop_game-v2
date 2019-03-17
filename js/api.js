/////////////////////////////////////////////////////////////////////////////////////////
//gabbing a object of infomation from api, and extracting {contry3code : capitals}
// and setting the option to load the list as an option on game.phrase
/////////////////////////////////////////////////////////////////////////////////////////

let request = new XMLHttpRequest();
var CountryCapitalObj = {};//the object {contry3code : capitals}
let capitalList = [];//list to be pickedfrom
let startGameWithCapitalCities = false; // false the default list will be load not the api one.


/////////////////////////////////////////////////////////////////////////////////////////
//making the request

request.open('GET', 'https://restcountries.eu/rest/v2/regionalbloc/eu', true)
request.onload = function () {
    let d = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {

    CountryCapitalObj = CountryCapitalFunction(d);
    capitalList = objToArr(CountryCapitalObj);

    return capitalList;
    } else {
        console.error('Error Could not Establish a Connection With API');
    }
}
request.send();

/////////////////////////////////////////////////////////////////////////////////////////
//useful function to create an object andarray

function CountryCapitalFunction(l) {
    let obj = l.reduce((acc, currentContry) => {
        acc[currentContry.alpha3Code] = currentContry.capital;
        return acc;
    }, {})
    // console.log(obj);
    return obj;
}
function objToArr(a) {
    for (let key in a) {
        capitalList.push(a[key])
    }
    return capitalList;

}