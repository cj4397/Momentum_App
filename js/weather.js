const API_KEY = "7ec1c2dd14326835f5bc227fb2e13733";

function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;


    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pic = document.querySelector(" #wicon");
            const city = document.querySelector(" #city");
            const weather = document.querySelector(" #temp");
            const weather_description = document.getElementById('weather_description');
            const humidity = document.getElementById('humidity');
            const slevel = document.getElementById('sea_level');
            const glevel = document.getElementById('ground_level');
            let iconcode = data.weather[0].icon;
            let iconurl = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png";


            slevel.innerHTML = `<b>${data.main.sea_level} hPa</b> = Atmospheric pressure on the sea level`;
            glevel.innerHTML = `<b>${data.main.grnd_level} hPa</b> = Atmospheric pressure on the ground level`;
            humidity.innerHTML = `<b>${data.main.humidity}%</b> = Humidity`;
            city.innerText = data.name;
            weather.innerText = `${data.main.temp}℃`;
            pic.src = iconurl;
            weather_description.innerHTML = `We are having: <b>${data.weather[0].description}</b>`
        });


}

function onGeoError() {

    alert("Can't find you.")
    document.getElementById('weather_container').style.visibility = "hidden"
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);