//getLocation

function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error)
    );
  });
}

function getLocation() {
  return getPosition().then((position) => {
    const location = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    };
    return location;
  });
}

async function weather() {
  const loc = await getLocation();
  renderWeather(loc);
  // console.log(getFutureWeather(loc));
}
weather();

// async function getLocation() {
//   if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const location = {
//         lat: position.coords.latitude,
//         lon: position.coords.longitude
//       };

//       return location;
//     });
//   } else {
//     alert("Geolocation is not supported by your browser");
//   }
// }

// getweather();

const apiKey = "dc478297180144ec1d96383662ca4abe";
async function getWeather(loc) {
  const lat = loc.lat;
  const lon = loc.lon;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  const data = await response.json();
  console.log(data);
  return data;
}

async function getFutureWeather() {
  // const lat = loc.lat;
  // const lon = loc.lon;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${apiKey}
`
  );
  const data = await response.json();
  console.log(data);
  return data;
}
getFutureWeather();

async function parseData(loc) {
  const data = await getWeather(loc);
  const dataWeather = {
    temp: data.main.temp - 273.15,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    name: data.name
  };
  return dataWeather;
}

async function renderWeather(loc) {
  const temp = document.querySelector(".js-temp");
  const feelsLike = document.querySelector(".js-feels-like");
  const humidity = document.querySelector(".js-humidity");
  const pressure = document.querySelector(".js-pressure");
  const description = document.querySelector(".js-main-weather-text");
  const icon = document.getElementById("js-main-weather-icon");
  const name = document.querySelector(".js-city");

  const data = await parseData(loc);

  temp.innerHTML = ` ${Math.round(data.temp)}°`;
  icon.src = `http://openweathermap.org/img/w/${data.icon}.png`;
  name.innerHTML = data.name;
  // feelsLike.innerHTML = data.feelsLike;
  // humidity.innerHTML = data.humidity;
  // pressure.innerHTML = data.pressure;
  description.innerHTML = data.description;
}

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
