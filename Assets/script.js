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
    const queryURL = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + '&units=imperial&appid=' + apiKey;

    //ajax call with then promise
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        currentLat = response.coord.lat;
        currentLon = response.coord.lon;
        getFiveDayForecast(currentLat, currentLon);
        cityName = response.name;
        $('#currentCity').text('City: ' + cityName);
        sendToLocalStorage(cityName, zipCode);
        addToSearchHistory(cityName);
    });
}

//function to return an ajax call from one call api based on latitude and longitude inputs
function getFiveDayForecast(lat, long) {
    //variable for URL to api request
    const queryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=minutely,hourly&units=imperial&appid=' + apiKey;
    //ajax call with then promise
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('#currentTemp').text('Temperature: ' + response.current.temp + (' ') + String.fromCharCode(176) + 'F');
        $('#currentHumidity').text('Humidity: ' + response.current.humidity + ' %');
        $('#currentWind').text('Wind Speed: ' + response.current.wind_speed + ' MPH');
        $('#currentUV').text('UV Index: ' + response.current.uvi);
    });
}


//create button for each city search

//click listener on each city search

//function to store form input to local storage
function sendToLocalStorage(city, zip) {
    localStorage.setItem('cityName', city);
    localStorage.setItem('zipCode', zip);
}

function retrieveFromLocalStorage() {
    localStorage.getItem('cityName');
}

function addToSearchHistory(city) {
    $('#history1').text(city);
    $('#history1').removeClass('collapse');
    $('#history1').addClass('collapse.show');
    console.log('hit');
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
    if (cityName === "" || cityName === undefined) {
        alert('City is required');
    } else if (zipCode === "" || zipCode === undefined) {
        alert('Zip Code is required');
    } else {
    //clear inputs
    $('#cityName').val('');
    $('#stateName').val('');
    $('#zipCode').val('');
    // run getCurrentWeatherData using cityName
    getCurrentWeatherData(cityName);
    }
});