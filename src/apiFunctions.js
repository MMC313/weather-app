export let unit = "imperial"


async function getCoord(city){
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=fb9354257ea335d5387ad134ddc55aa7`)
    const responseJson = await response.json();
    let coords = {};
    coords.lat = responseJson[0].lat
    coords.lon = responseJson[0].lon

    return coords;
}

async function currentWeather(latitude,longtitude,unit){
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&limit=1&units=${unit}&appid=fb9354257ea335d5387ad134ddc55aa7`)
    const weatherJson = await weather.json();

    return weatherJson;
}

async function forecastData(latitude,longtitude,unit){
    const forecast = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longtitude}&exclude={}&units=${unit}&appid=fb9354257ea335d5387ad134ddc55aa7`)
    const forecastJson = await forecast.json();

    return forecastJson;
}

 export async function weatherData(city,unit){
    const coords = await getCoord(city);
    const weather = await currentWeather(coords.lat,coords.lon,unit);
    const forecast = await forecastData(coords.lat,coords.lon,unit);
    let weatherForecast = {};

    weatherForecast.weather = weather;
    weatherForecast.forecast = forecast;

    return weatherForecast;
}
