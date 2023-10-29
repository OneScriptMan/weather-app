// getweather();

const apiKey = "dc478297180144ec1d96383662ca4abe";
async function getWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=51.50&lon=-0.127&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
}

async function parseData() {
  const data = await getWeather();
  const dataWeather = {
    temp: data.main.temp - 273.15,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    description: data.weather[0].description
  };
  return dataWeather;
}

async function renderWeather() {
  const temp = document.querySelector(".js-temp");
  const feelsLike = document.querySelector(".js-feels-like");
  const humidity = document.querySelector(".js-humidity");
  const pressure = document.querySelector(".js-pressure");
  const description = document.querySelector(".js-description");

  const data = await parseData();

  temp.insertAdjacentHTML("beforeend", ` ${Math.round(data.temp)} °C`);
  // feelsLike.innerHTML = data.feelsLike;
  // humidity.innerHTML = data.humidity;
  // pressure.innerHTML = data.pressure;
  // description.innerHTML = data.description;
}

renderWeather();

//get date

function getDate() {
  const today = new Date();
  return today;
}

function renderDate() {
  const date = document.querySelector(".js-date");
  const today = getDate();
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  };
  date.innerHTML = today.toLocaleDateString("en-GB", options);
}
renderDate();

function renderSeason() {
  const season = document.getElementById("js-scenery-illustration-icon");
  const today = getDate();
  console.log(season);
  console.log(today.getMonth());
  if (today.getMonth() >= 2 && today.getMonth() <= 4) {
    season.src = `./public/seasons/season-spring.png`;
  } else if (today.getMonth() >= 5 && today.getMonth() <= 7) {
    season.src = `./public/seasons/season-summer.png`;
  } else if (today.getMonth() >= 8 && today.getMonth() <= 10) {
    season.src = `./public/seasons/season-autumn.png`;
  } else {
    season.src = `./public/seasons/season-winter.png`;
  }
}
renderSeason();

// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}

// function getweather() {
//   const weather = fetch(
//     `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     });
// }
// getweather();
