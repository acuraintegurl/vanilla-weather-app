// add current time
function formatDate() {
  let now = new Date();
  let date = now.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let formattedDate = `${day} ${date} ${month}`;
  return formattedDate;
}

function formatTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let formattedTime = `${hours}:${minutes}`;
  return formattedTime;
}

let time = document.querySelector("#time");
time.innerHTML = formatTime();

let date = document.querySelector("#date");
date.innerHTML = formatDate();

// Show temperature from search input

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let temperatureValue = response.data.main.temp;
  temperature.innerHTML = `${temperatureValue}°C`;
  let description = document.querySelector("#description");
  let descriptionValue = response.data.weather[0].description;
  description.innerHTML = `${descriptionValue}`;
}

// search input should change the value of the city
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityName = document.querySelector("#city-name");
  let cityQuery = searchInput.value;
  let apiKey = "7a010bcd1946ade46c95e4c98b549354";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&units=metric`;
  if (searchInput.value) {
    cityName.innerHTML = `${searchInput.value}`;
  }

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// Use current location
function showCity(response) {
  let city = response.data.list[0].name;
  let locationTemperature = document.querySelector("#temperature");
  let currentTemperatureValue = response.data.list[0].main.temp;
  locationTemperature.innerHTML = `${currentTemperatureValue}°C`;
  let h1 = document.querySelector(`h1`);
  h1.innerHTML = `${city}`;
}

// get Location
function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = `metric`;
  let apiKey = `7a010bcd1946ade46c95e4c98b549354`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCity);
}
function useCurrentlocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", useCurrentlocation);
