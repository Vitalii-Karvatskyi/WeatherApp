let currentCity = "Los Angeles"
let units = "metric"



const city = document.querySelector(".weather__city")
const DataTime = document.querySelector(".weather__datetime")
const forecast = document.querySelector(".weather__forecast")
const temperature = document.querySelector(".weather__temperature")
const icon = document.querySelector(".weather__icon")
const weatherMinMax = document.querySelector(".weather__minmax")
const realfeel = document.querySelector(".weather__realfeel")
const humidity = document.querySelector(".weather__humidity")
const pressure = document.querySelector(".weather__pressure")
const wind = document.querySelector(".weather__wind")

document.querySelector(".weather__search").addEventListener("submit" , async function(e){
  e.preventDefault()
  currentCity = document.querySelector(".weather__searchform").value;
  await getWeather()
  document.querySelector(".weather__searchform").value = ""
})


document.querySelector(".weather_unit_celsius").addEventListener("click", async function(){
  units = "metric"
  await getWeather()
} )
document.querySelector(".weather_unit_farenheit").addEventListener("click", async function(){
  units = "imperial"
  await getWeather()
} )



function convertTime(timeStemp , timeZone) {
  const convertTimeZone = timeZone/3600
  const date = new Date(timeStemp*1000)
  const option = {
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric",
    hour:"numeric",
    minute:"numeric",
    timeZone: `Etc/GMT${convertTimeZone >= 0 ? '-' : '+'}${Math.abs(convertTimeZone)}`,
    hour12:true
  }

  return date.toLocaleString("en-US",option)
}


async function  getWeather() {
  const API_KEY = '64f60853740a1ee3ba20d0fb595c97d5';
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${units}`)
    const data = await response.json()
    console.log(data)
    if (!response.ok) {
      throw Error(response.statusText)
    }

    city.innerHTML = `${data.name}`
    DataTime.innerHTML =convertTime(data.dt , data.timezone)
    forecast.innerHTML = `<p>${data.weather[0].main}</p>`
    temperature.innerHTML =`${data.main.temp.toFixed()}`
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
    weatherMinMax.innerHTML = `
        <p>Min: ${data.main.temp_min.toFixed()}&#176</p>
        <p>Max: ${data.main.temp_max.toFixed()}&#176</p>
    `
    realfeel.innerHTML = `${data.main.feels_like.toFixed()}`
    humidity.innerHTML = `${data.main.humidity}`
    wind.innerHTML = `${data.wind.speed}`
    pressure.innerHTML = `${data.main.pressure} hPa`



  } catch (error) {
    console.log("всё плохо")
    console.log(error)
  }
}
getWeather()