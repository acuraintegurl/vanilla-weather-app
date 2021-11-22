function displayTemperature(response) {
  console.log(response.data.main.temp);
}

let apiKey = "7a010bcd1946ade46c95e4c98b549354";
let cityName = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
