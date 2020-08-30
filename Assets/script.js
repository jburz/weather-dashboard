let cityName;
let stateName;
let zipCode;
let searchHistory = [];
let currentLat;
let currentLon;
let now = moment();

apiKey = '3677b7f1ed1a37d22f29ccb0277f664a';

displayDate();
retrieveFromLocalStorage();
addToSearchHistory(searchHistory);

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
        console.log(response);
        $('#currentTemp').text('Temperature: ' + response.current.temp + (' ') + String.fromCharCode(176) + 'F');
        $('#currentHumidity').text('Humidity: ' + response.current.humidity + '%');
        $('#currentWind').text('Wind Speed: ' + response.current.wind_speed + ' MPH');
        $('#currentUV').addClass('border rounded p-1').text(response.current.uvi);
        if (uvi < 3) {
            console.log('green');
            $('#currentUV').addClass('bg-success');
        }
        else if (uvi >= 3 & uvi < 6) {
            console.log('yellow');
            $('#currentUV').addClass('bg-warning');
        }
        else if (uvi >= 6 & uvi < 8) {
            console.log('orange');
            $('#currentUV').css('background-color', '#FF5E13');
        }
        else if (uvi >= 8 & uvi < 11) {
            console.log('red');
            $('#currentUV').addClass('bg-danger');
        }
        else if (uvi >= 11) {
            console.log('purple');
            $('#currentUV').css('background-color', '#800080');
        }
        displayFiveDayForecast(response);
    });
}

//click listener on each city search

//function to store form input to local storage
function sendToLocalStorage(city, zip) {
    let citySearch = { city: city, zip: zip };
    searchHistory.unshift(citySearch);
    console.log('hit');
    console.log(searchHistory);
    if (searchHistory.length > 6) {
        searchHistory.pop();
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function retrieveFromLocalStorage() {
    searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    console.log(searchHistory);
}

// function to store form input to search history; display search history
function addToSearchHistory(searchHistory) {
    for (let i = 0; i < searchHistory.length; i++) {
        $('#history' + i).text(searchHistory[i].city);
        console.log(searchHistory[i].city);
        $('#history' + i).removeClass('collapse');
        $('#history' + i).addClass('collapse.show');
    }
}

function displayFiveDayForecast(responseFiveDay) {
    for (let i = 1; i < 6; i++) {
        $('#date' + i).text(now.add(1, 'days').format('l'));
        $('#icon' + i).attr('src', 'http://openweathermap.org/img/wn/' + responseFiveDay.daily[i].weather[0].icon + '@2x.png');
        $('#minTemp' + i).text('Min: ' + responseFiveDay.daily[i].temp.min + (' ') + String.fromCharCode(176) + 'F');
        $('#maxTemp' + i).text('Max: ' + responseFiveDay.daily[i].temp.max + (' ') + String.fromCharCode(176) + 'F');
        $('#humid' + i).text('Humidity: ' + responseFiveDay.daily[i].humidity + '%');
    };
}

function displayDate() {
    $('#header').text('FIVE DAY FORECAST - ' + now.format('l'));
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
        getCurrentWeatherData(cityName);
    }
});