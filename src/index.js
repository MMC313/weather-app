import _ from 'lodash';
import './style.css';
import moment from '../node_modules/moment'
import { weatherData,unit } from './apiFunctions.js'

const yourLocation = document.getElementById("location")
const genCondition = document.getElementById("genCondition")
const genTemp = document.getElementById("genTemp")
const unitBtn = document.getElementById("unitBtn")
const genIconContainer = document.getElementById("genIconContainer")
let genIcon = new Image();
const searchLocation = document.getElementById("searchLocation")
const searchBtn = document.getElementById("searchButton")
const calendar = document.getElementById("date");
const clock = document.getElementById("clock")
const specTemp = document.querySelector(".specTemp")
const specHumid = document.querySelector(".specHumid")
const specRain = document.querySelector(".specRain")
const specWind = document.querySelector(".specWind")
let date = new Date();
let day = date.getDay();
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const weekdays = document.querySelectorAll(".day")
const highTemp = document.querySelectorAll(".highTemp")
const lowTemp = document.querySelectorAll(".lowTemp")
const weekIcon = document.querySelectorAll(".weekIcon")


let units = " °F"       //default 
let city = "new york" //default



function time(zone){
    let d = new Date();
    clock.innerHTML = d.toLocaleString('en-US', { timeZone: zone}).slice(10,21)
    let dayOfWeek = new Date(d.toLocaleString('en-US', { timeZone: zone}).slice(0,8))
    calendar.innerHTML = dayOfWeek.toString().slice(0,15)
}

function clearInfo(){
    clock.innerHTML = "";
    genIcon.src = "";
    weekIcon.forEach(x => x.innerHTML="");
    searchLocation.innerHTML = "";
}



async function loadData(city,unit){
    try{
        const data = await weatherData(city,unit);
        const weather = data.weather
        const forecast = data.forecast
        yourLocation.innerHTML = weather.name;
        genCondition.innerHTML = weather.weather[0].main;
        genTemp.innerHTML = Math.round(weather.main.temp)+units;


        genIcon.classList.add("genIcon")
    
        switch(weather.weather[0].main){
            case "Clouds":
                genIcon.src = './images/cloudy.svg'
                break;
            case "Clear":
                genIcon.src = './images/sun.svg'
                break;
            case "Snow":
                genIcon.src = './images/snow.svg'
                break;
            case "Thunderstorm":
                genIcon.src = './images/thunder.svg'
                break;
            case "Rain" || "Drizzle":
                genIcon.src = './images/rain.svg'
                break;
        }


        genIconContainer.appendChild(genIcon);

        setInterval(()=>{time(forecast.timezone)},1000)
        
        specTemp.innerHTML = Math.round(weather.main.feels_like)+units;
        specHumid.innerHTML = weather.main.humidity+"%"
        specRain.innerHTML = forecast.daily[0].pop+"%"
        specWind.innerHTML = Math.round(weather.wind.speed)+" mph"

        for(let i=0;i<days.length;i++){
            weekdays[i].innerHTML=days[i];
        }

        for(let i=0;i<days.length;i++){
            const forecastIcon = new Image();
            highTemp[i].innerHTML = Math.round(forecast.daily[i].temp.max)+units;
            lowTemp[i].innerHTML = Math.round(forecast.daily[i].temp.min)+units;
            
            if(forecast.daily[i].weather[0].main === "Clear"){
                forecastIcon.src = './images/sun.svg'
            }else if(forecast.daily[i].weather[0].main === "Clouds"){
                forecastIcon.src = './images/cloudy.svg'
            }else if(forecast.daily[i].weather[0].main === "Rain" || forecast.daily[i].weather[0].main === "Drizzle"){
                forecastIcon.src = './images/rain.svg'
            }else if(forecast.daily[i].weather[0].main === "Snow"){
                forecastIcon.src = './images/snow.svg'
            }else if(forecast.daily[i].weather[0].main === "Thunderstorm"){
                forecastIcon.src = './images/thunder.svg'
            }
            forecastIcon.classList.add("forecastIcon")
            weekIcon[i].appendChild(forecastIcon);
        }

    }catch(err){
        alert("No city Found")
        
    }
    
   

}

searchBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    if(searchLocation.value != ""){
        for(let i=0;i<=100;i++){
            clearInterval(i)
        }
        clearInfo();
        city = searchLocation.value;
        loadData(city,unit);
        searchLocation.value = ""
    }

})

unitBtn.addEventListener("click",(event)=>{
    
    if(units === " °F"){
        unit = "metric"
        units = " °C"
        
    }else if(units === " °C"){
        unit = "imperial"
        units = " °F"
    }
    clearInfo();
    loadData(city,unit)
})


loadData(city,unit);

