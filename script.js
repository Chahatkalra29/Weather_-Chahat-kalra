const inputBox = document.querySelector('.input-box');
const searchButton = document.getElementById('search-button');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const WeatherBody = document.querySelector('.weather-body');

async function checkWeather(city) {
    const apiKey = 'c861a6dbeb7ea32434cfe71e0cfab4ea';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const weatherData = await (await fetch(url)).json();

    if (weatherData.cod === "404") {
        location_not_found.style.display = "flex";
        WeatherBody.style.display = "none";
        console.log("ERROR");
        return;
    }

    location_not_found.style.display = "none";
    WeatherBody.style.display = "flex";
    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
    description.innerHTML = `${weatherData.weather[0].description}`;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    windSpeed.innerHTML = `${weatherData.wind.speed} km/h`;

    switch (weatherData.weather[0].main) {
        case 'Clouds':
            weatherImg.src = "assets/cloud.png";
            break;
        case 'Clear':
            weatherImg.src = "assets/clear.png";
            break;
        case 'Rain':
            weatherImg.src = "assets/rain.png";
            break;
        case 'Mist':
            weatherImg.src = "assets/mist.png";
            break;
        case 'Snow':
            weatherImg.src = "assets/snow.png";
            break;
    }
    console.log(weatherData);
}

searchButton.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkWeather(inputBox.value);
    }
});