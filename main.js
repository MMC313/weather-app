const test = document.getElementById("test")


async function getCoord(location){
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=fb9354257ea335d5387ad134ddc55aa7`)
    const responseJson = await response.json();
    const coords = {};
    coords.lat = responseJson[0].lat
    coords.lon = responseJson[0].lon

    return coords;
}

async function currentWeather(latitude,longtitude){
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&limit=1&appid=fb9354257ea335d5387ad134ddc55aa7`)
    const weatherJson = await weather.json();
    console.log(weatherJson)
}


async function getData(){
 const coords = await getCoord("new york");
 const currentWeather = await currentWeather(coords.lat,coords.lon);
 
}

getData()