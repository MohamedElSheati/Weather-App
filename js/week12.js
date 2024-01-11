let searchInput=document.getElementById("searchInput")
let todayName=document.getElementById("today-date-name")
let todayNumber=document.getElementById("today-date-number")
let todayMonth=document.getElementById("today-date-month")
let todayLocation=document.getElementById("today-location")
let todayTemp=document.getElementById("today-temp")
let todayConditionImg=document.getElementById("today-condition-img")
let todayConditionTxt=document.getElementById("today-condition-text")
let humidity=document.getElementById("humidity")
let wind=document.getElementById("wind")
let windDirection=document.getElementById("wind-direction")

let nextDay=document.getElementById("next-date-name")
let nextMaxTemp=document.getElementById("next-max-temp")
let nextMinTemp=document.getElementById("next-min-temp")
let nextConiditonImg=document.getElementById("next-coniditon-img")
let nextConditionTxt=document.getElementById("next-condition-text")

async function getWeatherData(){
    let weatherResponse =await fetch("http://api.weatherapi.com/v1/forecast.json?key=f3b6cacf02c74d6a8c5141335241101&q=07112&days=7")
    let weatherData=weatherResponse.json()
    return weatherData
}

function displayTodayDate(date){
    todayLocation.innerHTML=date.location.name
    todayTemp.innerHTML=date.current.temp_c
    todayConditionImg.setAttribute("src",date.current.condition.icon)
    todayConditionTxt.innerHTML=date.current.condition.text
    humidity.innerHTML=date.current.humidity+"%"
    wind.innerHTML=date.current.wind_kph+"KM/H"
    windDirection.innerHTML=date.current.wind_dir
}

function displayNextData(data){
    let forecastData=data.forecast.forecastday
    for(let i0;i<2;i++){
        let nextDate=new Date(forecastData[i+1].data)
        nextDay[i].innerHTML=nextDate.toLocaleDateString("en-us",{weekday:"long"})
        nextMaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML=forecastData[i+1].day.mintemp_c
        nextConiditonImgConditionImg.setAttribute("src",forecastData[i+1].day.condition.icon)
        nextConditionTxt.innerHTML=forecastData[i+1].day.condition.text
    }
}

async function Ready(){
    let weatherData=await getWeatherData()
    displayTodayDate(weatherData)
    displayNextData(weatherData)
}

Ready()

searchInput.addEventListener("keyup",function(){
    Ready(searchInput.value)
})