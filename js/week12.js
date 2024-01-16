"use strict"
let todayDay=document.getElementById("today")
let todayNum=document.getElementById("todayNum")
let todayMonth=document.getElementById("todayMonth")
let nextDay=document.getElementsByClassName("next-day")
let cityName=document.getElementById("city")
let cityTemp=document.getElementById("temp")
let cityCond=document.getElementById("icon")
let cityWeatherDesc=document.getElementById("text")
let humidity=document.getElementById("humidity")
let windSpeed=document.getElementById("windSpeed")
let windDirection=document.getElementById("windDirection")
let maxTemp=document.getElementsByClassName("max-Temp")
let minTemp=document.getElementsByClassName("min-Temp")
let nextCondition=document.getElementsByClassName("cond")
let nextCondIcon=document.getElementsByClassName("next-img")
let search=document.querySelector("#search")
let find=document.querySelector("#button-addon1")

let dataWeather=[]
let forecastData=[]


find.addEventListener("click",function(){
        weatherData(search.value)
    })
  


async function weatherData(name){
    let req= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f3b6cacf02c74d6a8c5141335241101&q=${name}&days=4`)
    dataWeather = await req.json()
    forecastData=dataWeather.forecast.forecastday
    
    let todayDate=new Date(dataWeather.current.last_updated)
    todayDay.innerHTML=todayDate.toLocaleString("en-us",{weekday:"long"})
    todayNum.innerHTML=todayDate.getDate()
    todayMonth.innerHTML=todayDate.toLocaleString("en-us",{month:"short"})
    cityName.innerHTML=dataWeather.location.name;
    cityTemp.innerHTML=dataWeather.current.temp_c+` <sup>o</sup>C`
    cityCond.setAttribute("src",dataWeather.current.condition.icon)
    cityWeatherDesc.innerHTML=dataWeather.current.condition.text
    humidity.innerHTML=dataWeather.current.humidity+"%"
    windSpeed.innerHTML=dataWeather.current.wind_kph+"Km/hr"
    windDirection.innerHTML=dataWeather.current.wind_dir
    
    for(let i=0;i<forecastData.length;i++){
        let nextDate=new Date(forecastData[i+1].date)
        nextDay[i].innerHTML=nextDate.toLocaleString("en-us",{weekday:"long"})
        nextCondIcon[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        maxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c+` <sup>o</sup>`
        minTemp[i].innerHTML=forecastData[i+1].day.mintemp_c+` <sup>o</sup>`
        nextCondition[i].innerHTML=forecastData[i+1].day.condition.text
    }
    
}




