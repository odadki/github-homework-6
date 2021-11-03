//Feature 1 In your project, display the current date and time using JavaScript: Tuesday 16:00
let now = new Date();
let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
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

h2.innerHTML = `Today is ${day}, ${month} ${date} and the current time is ${hours}:${minutes}`;

//Feature 2 Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-location");
  let city = searchInput.value;
  let apiKey = "d4abd23a84756d0308b620a46b653aca";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);
  let heading = document.querySelector("#update-city");
  heading.innerHTML = `${response.data.name}`;
  let currentTemp = document.querySelector("#temperature-city");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let weatherCondition = document.querySelector("#description");
  weatherCondition.innerHTML = response.data.weather[0].main;
}

let form = document.querySelector("#weather-form");
form.addEventListener("submit", search);

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "d4abd23a84756d0308b620a46b653aca";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);
