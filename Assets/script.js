let cityName;
let stateName;
let zipCode;
let cities = [];
let currentLat;
let currentLon;

apiKey = '3677b7f1ed1a37d22f29ccb0277f664a';

//function to return an ajax call from the current weather api based on a city input
function getCurrentWeatherData(city) {
    //variable for URL to api request
    const queryURL = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + '&appid=' + apiKey;

    //ajax call with then promise
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        currentLat = response.coord.lat;
        currentLon = response.coord.lon;
        getFiveDayForecast(currentLat, currentLon);
    });
}

//function to return an ajax call from one call api based on latitude and longitude inputs
function getFiveDayForecast(lat, long) {
    //variable for URL to api request
    const queryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=current,minutely,hourly&appid=' + apiKey;
    //ajax call with then promise
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
}


//create button for each city search

//click listener on each city search

//function to store form input to local storage
function sendToLocalStorage(city) {
    localStorage.setItem('cityName', city);
}

function retrieveFromLocalStorage() {
    localStorage.getItem('cityName');
}

// click listener on search button
$('#submitBtn').on('click', function (event) {
    //prevent form from submitting
    event.preventDefault();
    //store input values in variables
    cityName = $('#cityName').val();
    stateName = $('#stateName').val();
    zipCode = $('#zipCode').val();
    //checks that all inputs are filled in
    if (zipCode === "") {
        alert('Zip Code is required');
    } else {
        // run getCurrentWeatherData using cityName
        getCurrentWeatherData(cityName);
        // sendToLocalStorage(cityName);
    }
});