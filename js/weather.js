const API_KEY = "754386643ae43254aa95d2fef03974f0";

function geoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log(lat, lon);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}℃`;
      city.innerText = data.name;
    });
}

function geoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
