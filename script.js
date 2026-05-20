alert("Hello");
alert("To a Weather app");

let dQS = document.querySelector.bind(document);

let b = dQS("#start");

let T = dQS("#T");
let H = dQS("#H");
let F = dQS("#F");
let W = dQS("#W");
let V = dQS("#V");
let body = dQS("body");

import { countries, latitudes, longitudes } from "./data.js";

b.addEventListener("click", async () => {
    b.innerHTML = "Processing...";
    let u = dQS("input[name='theme']:checked");
    let s = dQS("#select").value;
    let capital = countries[s];
    let api = "";
    if(u.value == "C") {
        api = `https://api.open-meteo.com/v1/forecast?latitude=${latitudes[capital]}&longitude=${longitudes[capital]}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`
    } else if(u.value == "F") {
        api = `https://api.open-meteo.com/v1/forecast?latitude=${latitudes[capital]}&longitude=${longitudes[capital]}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&temperature_unit=fahrenheit`
    }
    let response = await fetch(api)
    let data = await response.json();
    console.log(data);
    console.log("Status:", response.status);
    let code = data.current.weather_code;
    if(code === 0 || code === 1){
        T.innerHTML = "Clear";
        body.style.backgroundImage = "url(D:js/Core/weatherApp/images/clear.png)";
    } else if(code >= 2 && code <= 3){
        T.innerHTML = "Cloudy";
        body.style.backgroundImage = "url(D:js/Core/weatherApp/images/clouds)";
    } else if(code === 45 || code === 48){
        T.innerHTML = "Fog";
        body.style.backgroundImage = "url(D:js/Core/weatherApp/images/fog.png)";
    } else if(code >= 61 && code <= 65){
        T.innerHTML = "Rain";
        body.style.backgroundImage = "url(D:js/Core/weatherApp/images/rain.png)";
    } else if(code >= 71 && code <= 75){
        T.innerHTML = "Snow";
        body.style.backgroundImage = "url(D:js/Core/weatherApp/images/snow.png)";
    } else if(code === 95){
        T.innerHTML = "Thunder";
        body.style.backgroundImage = "url(D:js/Core/weatherApp/images/thunder.png)";
    };        
    F.innerHTML = `Feels Like: ${data.current.apparent_temperature}${data.current_units.apparent_temperature}`;
    H.innerHTML = `Humidity: ${data.current.relative_humidity_2m}${data.current_units.relative_humidity_2m}`;
    V.innerHTML = `${data.current.temperature_2m}${data.current_units.temperature_2m}`;
    W.innerHTML = `Wind Speed: ${data.current.wind_speed_10m}${data.current_units.wind_speed_10m}`;
    b.innerHTML = "Get Weather";
});