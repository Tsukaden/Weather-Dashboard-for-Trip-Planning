const apiKey = "e4b0368064a39ae4ac28f96812e6ed04";
const cityInput = document.getElementById("city");
const searchButton = document.getElementById("search");
const weatherInfo = document.getElementById("weather-info");

searchButton.addEventListener("click", () => {
  const city = cityInput.value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  let currentWeatherHtml;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const cityTitle = `<h2>${data.name}</h2>`;
      const date = new Date(data.dt * 1000).toLocaleDateString();
      const dateParagraph = `<p>${date}</p>`;
      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      const iconImage = `<img src="${iconUrl}" alt="${data.weather[0].description}">`;
      const temperature = `<p>Temperature: ${data.main.temp} &deg;C</p>`;
      const humidity = `<p>Humidity: ${data.main.humidity} %</p>`;
      const windSpeed = `<p>Wind Speed: ${data.wind.speed} m/s</p>`;

      currentWeatherHtml = `${cityTitle}${dateParagraph}${iconImage}${temperature}${humidity}${windSpeed}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

      return fetch(forecastUrl);
    })
    .then(response => response.json())
    .then(data => {
      let forecastWeatherHtml = "<h2>5-Day Forecast</h2>";
      for (let i = 0; i < data.list.length; i += 8) {
        const forecastDate = new Date(data.list[i].dt * 1000).toLocaleDateString();
        const forecastIconUrl = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`;
        const forecastIconImage = `<img src="${forecastIconUrl}" alt="${data.list[i].weather[0].description}">`;
        const forecastTemperature = `<p>Temperature: ${data.list[i].main.temp} &deg;C</p>`;
        const forecastHumidity = `<p>Humidity: ${data.list[i].main.humidity} %</p>`;
        const forecastHtml = `<div>${forecastDate}${forecastIconImage}${forecastTemperature}${forecastHumidity}</div>`;
        forecastWeatherHtml += forecastHtml;
      }
      weatherInfo.innerHTML = currentWeatherHtml + forecastWeatherHtml;
    })
    .catch(error => {
      console.log("Error fetching weather data:", error);
    });
});