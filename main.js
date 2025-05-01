let imgStatus = document.querySelector(".weather .img-status");
let input = document.querySelector(".searche input");
let searcheBtn = document.querySelector(".searche button");

//  http://api.weatherapi.com/v1/current.json?key=e1acf5fe790d463585d152512253004&q=guelmim&aqi=no
let apiKey = "e1acf5fe790d463585d152512253004";
let apiUrl = "https://api.weatherapi.com/v1/current.json?aqi=no";

async function checkWeather() {
    let responce = await fetch(apiUrl + `&key=${apiKey}` + `&q=${input.value}`);
    let data = await responce.json();

    if (Object.keys(data)[0] === "error") {
        if (data.error.message === "Parameter q is missing."){
            document.querySelector(".container .vide").style.display = "block";
            document.querySelector(".container .error").style.display = "none";
            document.querySelector(".container .currentInfo").style.display = "none";
        } else if (data.error.message === "No matching location found.") {
            document.querySelector(".container .vide").style.display = "none";
            document.querySelector(".container .error").style.display = "block";
            document.querySelector(".container .currentInfo").style.display = "none";
        }
    } else if (Object.keys(data)[0] === "location") {
        document.querySelector(".container .vide").style.display = "none";
        document.querySelector(".container .error").style.display = "none";
        document.querySelector(".container .currentInfo").style.display = "block";

        let temp = document.querySelector('.container .temp');
        temp.innerHTML = data.current.temp_c + "°C";
    
        let city = document.querySelector('.container .sity');
        city.innerHTML = data.location.name.toUpperCase();
    
        let humidity = document.querySelector(".container .weatherInfo .text .humidity");
        humidity.innerHTML = data.current.humidity + "%";
        let wind = document.querySelector(".container .weatherInfo .text .wind");
        wind.innerHTML = data.current.wind_kph + "Km/h";
        // weather status
        console.log(data.current.condition.text)
        let weatherStatus = data.current.condition.text;
        if (weatherStatus === "Clear") {
            imgStatus.src = "images/sunny.png";
        } else if (weatherStatus === "Sunny") {
            imgStatus.src = "images/sunny.png";
        } else if (weatherStatus === "Partly cloudy") {
            imgStatus.src = "images/partly-cloudy.png";
        } else if (weatherStatus === "Mist") {
            imgStatus.src = "images/cloudy.png";
        } else if (weatherStatus === "Patchy light drizzle") {
            imgStatus.src = "images/rain.png";
        } else {
            imgStatus.src = "images/rain.png";
        }

    }

}

searcheBtn.addEventListener('click', (e) => {
    checkWeather();
});
