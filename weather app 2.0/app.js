let weather = {
    "api_key": "fcd707b89bf58e6d4f214ba0f6eb623f",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.api_key
        ).then((response) => (response.json()))
            .then((data) => this.displayWeather(data))
    }, 
    displayWeather: (data) => {
        const { name, timezone } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, pressure } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " KM/H";
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + " kPa";
        document.querySelector(".timezone").innerText = "Time-Zone: " + timezone + " UTC";

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + ")";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-box").value)
    }
};

document.querySelector(".search-box").addEventListener("keypress", function (e) {
	if (e.which === 13) weather.search();
});

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
})


weather.fetchWeather("ludhiana");

