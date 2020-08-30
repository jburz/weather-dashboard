# Weather Dashboard

This app is designed to enable the user to search for a city and get weather statistics for the current day as well as a 5 day forecast.

## How it works

1. A city and zip code must be entered as inputs in the search panel in the top left.  Currently the app can only support cities and zip codes within the US.
2. The app will display the city name, current temp, humidity wind speed and uv index in the main display window in the top right.  
3. The UV index will be highlighted a certain color depending on the severity of the index.  This is accordance with [EPA guidelines](https://www.epa.gov/sites/production/files/documents/uviguide.pdf).
4. The bottom right window holds the 5 day forecast.  Each day will hold the following:
    - Date
    - Icon indicating the forecasted weather for the day
    - Minimum and maximum temperatures
    - Humidity
5. Each time a new search is entered, the search parameters are logged and stored in a search history in the bottom left.  Up to 8 searches can be stored at a time.  Searches beyond that will be added and the oldest search will be lost.
 

Click to navigate to the [weather dashboard](https://jburz.github.io/weather-dashboard)


## Screenshot
![weather dashboard](./assets/weather-dashboard.png)

## Tools

The layout and design for this app uses the css framework [bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/).

The date formatting and display was done with [moment.js](https://momentjs.com/).

All of the weather data was obtained by ajax requests through the [open weather map api](https://openweathermap.org/api).

## Credits

This app was created entirely by [Jake Burzlaff](https://www.github.com/jburz).