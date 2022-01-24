const apikey = "3265874a2c77ae4a04bb96236a642d2f";
// defined main elements of weather map
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
// used to allow access to cities, so current weather data can be pulled from openweathermap.org
const url =(city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
// code used to retrieve specific temp for the city name submitted in the form
async function getWeatherByLocation(city) {
        const resp = await fetch(url(city), {
        origin: "cors"});
        const respData = await resp.json();

        addWeatherToPage(respData);
}

function addWeatherToPage(data) {
       const temp = KtoC(data.main.temp);

       const weather = document.createElement('div');
       weather.classList.add('weather');
// added image for visual decription of weather temperature
       weather.innerHTML =`
       <h2>${temp}°C</h2>
       <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />
       `;

       main.appendChild(weather);
}

function KtoC(K) {
    return (K - 273.15).toFixed(2);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
})
// add barometric pressure and add alarm
