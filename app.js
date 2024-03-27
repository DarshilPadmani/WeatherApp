const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;

const getWeather = async (city) => {
    weather.innerHTML = `<h2>Loading...</h2>`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            showWeather(data);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        weather.innerHTML = `<h2>Something went wrong. Please try again later.</h2>`;
    }
};

const showWeather = (data) => {
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4>${data.weather[0].main}</h4>
        </div>
    `;
};

form.addEventListener("submit", (event) => {
    getWeather(search.value.trim());
    event.preventDefault();
});
