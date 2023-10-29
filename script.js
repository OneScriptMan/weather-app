// getweather();

const apiKey = "dc478297180144ec1d96383662ca4abe";
async function getWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=51.50&lon=-0.127&appid=${apiKey}`
  );
  const data = await response.json();
  console.log(data);
  return data;
}

async function parseData() {
  const data = await getWeather();
  console.log(data);
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
  console.log(data);

  temp.insertAdjacentHTML("beforeend", ` ${Math.round(data.temp)} °C`);
  // feelsLike.innerHTML = data.feelsLike;
  // humidity.innerHTML = data.humidity;
  // pressure.innerHTML = data.pressure;
  // description.innerHTML = data.description;
}

renderWeather();

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
