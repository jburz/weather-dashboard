let cityName;
let cities = [];
apiKey = '3677b7f1ed1a37d22f29ccb0277f664a';

//function to return an ajax call based on a city input
function getCurrentWeatherData(city) {
    //variable for URL to api request
    const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;

    //ajax call with then promise
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
}

// click listener on search button
$('#submitBtn').on('click', function (event) {
    //prevent form from submitting
    event.preventDefault();
    //store input value in variable
    cityName = $('#cityName').val();
    //run getCurrentWeatherData using cityName
    getCurrentWeatherData(cityName);
    sendToLocalStorage(cityName);
});

//click listener on city history

//function to store form input to local storage
function sendToLocalStorage(city) {
    localStorage.setItem('cityName', city);
}

function retrieveFromLocalStorage() {
    localStorage.getItem('cityName');
}