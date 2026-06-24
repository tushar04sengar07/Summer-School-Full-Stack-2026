async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const weatherResult = document.getElementById("weatherResult");

    if (!city) {
        weatherResult.innerHTML =
            "<p class='error'>Please enter a city name.</p>";
        return;
    }

    try {

        // STEP 1: Get latitude & longitude
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            weatherResult.innerHTML =
                "<p class='error'>City not found.</p>";
            return;
        }

        const location = geoData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;
        const cityName = location.name;
        const country = location.country;

        // STEP 2: Get weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

        const weatherData = await weatherResponse.json();

        const weather = weatherData.current_weather;

        weatherResult.innerHTML = `
            <h2>${cityName}, ${country}</h2>
            <p>Temperature: ${weather.temperature}°C</p>
            <p>Wind Speed: ${weather.windspeed} km/h</p>
            <p>Wind Direction: ${weather.winddirection}°</p>
            <p>Time: ${weather.time}</p>
        `;

    } catch (error) {

        weatherResult.innerHTML =
            "<p class='error'>Something went wrong.</p>";

        console.error(error);
    }
}