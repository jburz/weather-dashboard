let cityName;
let stateName;
let zipCode;
let searchHistory = [];
let currentLat;
let currentLon;
// let now = moment();

apiKey = '3677b7f1ed1a37d22f29ccb0277f664a';

displayDate();
retrieveFromLocalStorage();
if (searchHistory !== null) {
    addToSearchHistory(searchHistory);
}

//function to return an ajax call from the current weather api based on a city input
function getCurrentWeatherData(zipCode) {
    //variable for URL to api request
    const queryURL = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + '&units=imperial&appid=' + apiKey;

    //ajax call with then promise
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        currentLat = response.coord.lat;
        currentLon = response.coord.lon;
        getFiveDayForecast(currentLat, currentLon);
        cityName = response.name;
        $('#currentCity').text('City: ' + cityName);
        $('#currentIcon').attr('src', 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png');
        sendToLocalStorage(cityName, zipCode);
        addToSearchHistory(searchHistory);
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
        let uvi = response.current.uvi;
        $('#currentTemp').text('Temperature: ' + response.current.temp + (' ') + String.fromCharCode(176) + 'F');
        $('#currentHumidity').text('Humidity: ' + response.current.humidity + '%');
        $('#currentWind').text('Wind Speed: ' + response.current.wind_speed + ' MPH');
        $('#currentUV').addClass('border rounded p-1').text(uvi);
        if (uvi < 3) {
            $('#currentUV').addClass('bg-success');
            $('#currentUV').removeClass('bg-warning');
            $('#currentUV').removeClass('bg-danger');
        }
        else if (uvi >= 3 & uvi < 6) {
            $('#currentUV').addClass('bg-warning');
            $('#currentUV').removeClass('bg-success');
            $('#currentUV').removeClass('bg-danger');
        }
        else if (uvi >= 6 & uvi < 8) {
            $('#currentUV').css('background-color', '#FF5E13');
            $('#currentUV').removeClass('bg-success');
            $('#currentUV').removeClass('bg-warning');
            $('#currentUV').removeClass('bg-danger');
        }
        else if (uvi >= 8 & uvi < 11) {
            $('#currentUV').addClass('bg-danger');
            $('#currentUV').removeClass('bg-success');
            $('#currentUV').removeClass('bg-warning');
        }
        else if (uvi >= 11) {
            $('#currentUV').css('background-color', '#800080');
            $('#currentUV').removeClass('bg-success');
            $('#currentUV').removeClass('bg-warning');
            $('#currentUV').removeClass('bg-danger');
        }
        displayFiveDayForecast(response);
    });
}

//function to store form input to local storage
function sendToLocalStorage(city, zip) {
    let citySearch = { city: city, zip: zip };
    searchHistory.unshift(citySearch);
    if (searchHistory.length > 8) {
        searchHistory.pop();
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function retrieveFromLocalStorage() {
    if (localStorage.getItem('searchHistory') !== null) {
        searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    }
}

// function to store form input to search history; display search history
function addToSearchHistory(searchHistory) {
    for (let i = 0; i < searchHistory.length; i++) {
        $('#history' + i).text(searchHistory[i].city);
        $('#history' + i).removeClass('collapse');
        $('#history' + i).addClass('collapse.show');
        $('#history' + i).data('zipCode', searchHistory[i].zip);
    }
}

function displayFiveDayForecast(responseFiveDay) {
    for (let i = 1; i < 6; i++) {
        $('#date' + i).text(moment().add(i, 'days').format('l'));
        $('#icon' + i).attr('src', 'http://openweathermap.org/img/wn/' + responseFiveDay.daily[i].weather[0].icon + '@2x.png');
        $('#minTemp' + i).text('Min: ' + responseFiveDay.daily[i].temp.min + (' ') + String.fromCharCode(176) + 'F');
        $('#maxTemp' + i).text('Max: ' + responseFiveDay.daily[i].temp.max + (' ') + String.fromCharCode(176) + 'F');
        $('#humid' + i).text('Humidity: ' + responseFiveDay.daily[i].humidity + '%');
    };
}

function displayDate() {
    $('#header').text('FIVE DAY FORECAST - ' + moment().format('l'));
}

// click listener on submit button
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
        getCurrentWeatherData(zipCode);
    }
});

//click listener on each city search button
$('.list-group').on('click', function (event) {
    getCurrentWeatherData($(event.target).data().zipCode);
});