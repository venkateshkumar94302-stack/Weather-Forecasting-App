const apiKey = "b7ae75b7fdaf5f0bf80150b4c576b693";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const unitBtn = document.getElementById("unitBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const condition = document.getElementById("condition");

let isCelsius = true;
let currentTempC = null;

// Search button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    getWeather(city);
});

// Enter key support
cityInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// Fetch weather
function getWeather(city) {
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            cityName.innerText = data.name;

            currentTempC = data.main.temp;
            temperature.innerText = Math.round(currentTempC) + "°C";
            unitBtn.innerText = "°F";
            isCelsius = true;

            humidity.innerText = "Humidity: " + data.main.humidity + "%";
            wind.innerText = "Wind Speed: " + data.wind.speed + " km/h";
            condition.innerText = data.weather[0].description;

            updateBackground(data.weather[0].description.toLowerCase());
        })
        .catch(() => {
            alert("City not found!");
        });
}

// Temperature toggle
unitBtn.addEventListener("click", () => {
    if (currentTempC === null) return;

    if (isCelsius) {
        const f = (currentTempC * 9/5) + 32;
        temperature.innerText = Math.round(f) + "°F";
        unitBtn.innerText = "°C";
    } else {
        temperature.innerText = Math.round(currentTempC) + "°C";
        unitBtn.innerText = "°F";
    }

    isCelsius = !isCelsius;
});

// Background change
function updateBackground(cond) {
    const body = document.body;

    if (cond.includes("clear")) {
        body.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
    } else if (cond.includes("cloud")) {
        body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
    } else if (cond.includes("rain")) {
        body.style.background = "linear-gradient(135deg, #4b79a1, #283e51)";
    } else if (cond.includes("mist") || cond.includes("fog")) {
        body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
    }
}
