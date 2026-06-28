// Open-Meteo APIs
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";

// City Name
const city = "Dumka";

async function getWeather() {
    try {
        // STEP 1: Create Geocoding URL
        const geoURL = `${GEOCODING_API}?name=${city}&count=1`;

        console.log("Geocoding URL:");
        console.log(geoURL);

        // STEP 2: Call Geocoding API
        const geoResponse = await fetch(geoURL);

        // STEP 3: Convert response into JSON
        const geoData = await geoResponse.json();

        console.log("\nGeocoding Response:");
        console.log(geoData);

        // STEP 4: Get Latitude & Longitude
        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;

        console.log("\nLatitude :", latitude);
        console.log("Longitude:", longitude);

        // STEP 5: Create Weather URL
        const weatherURL =
            `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;

        console.log("\nWeather URL:");
        console.log(weatherURL);

        // STEP 6: Call Weather API
        const weatherResponse = await fetch(weatherURL);

        // STEP 7: Convert response into JSON
        const weatherData = await weatherResponse.json();

        console.log("\nWeather Response:");
        console.log(weatherData);

        // STEP 8: Display Weather
        console.log("\nCurrent Weather");
        console.log("----------------");
        console.log("Temperature :", weatherData.current.temperature_2m + " °C");
        console.log("Wind Speed  :", weatherData.current.wind_speed_10m + " km/h");

    } catch (error) {
        console.log("Error:", error.message);
    }
}

// Call Function
getWeather();