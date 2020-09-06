import {  
  OpenWeatherMapCurrentData,
  CleanedUpCurrentData,
  OpenWeatherMapForecastData, 
  CleanedUpForecastData } from './weatherapi.types'

export const cleanUpCurrentWeatherData = (obj : OpenWeatherMapCurrentData) : CleanedUpCurrentData => {
  const temp = obj.main.temp
  const skies = obj.weather[0].main
  return {
    temp,
    skies
  }
}

const dayMapper : {
  [prop: string] : string
} = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
}

export const cleanUpForecastData = (obj: OpenWeatherMapForecastData) : CleanedUpForecastData => {
  return obj.list.reduce((acc, next)=>{
    // convention to not mutate array, but I dont thing there is a problem here
    const dayObject = {
      day: dayMapper[new Date(next.dt * 1000).getDay()],
      temp: next.temp.day,
      skies: next.weather[0].main
    }
    acc.push(dayObject);
    return acc;
  },[] as CleanedUpForecastData).slice(1)
}


export const createCurrentWeatherUrl = (submittedCity : string) => `https://api.openweathermap.org/data/2.5/weather?q=${submittedCity}&appid=${process.env.REACT_APP_WEATHER_APP_API_TOKEN}&units=metric`
export const createForcastUrl = (submittedCity : string) => `https://api.openweathermap.org/data/2.5/forecast/daily?q=${submittedCity}&cnt=6&appid=${process.env.REACT_APP_WEATHER_APP_API_TOKEN}&units=metric`



export default {
  cleanUpCurrentWeatherData,
  cleanUpForecastData
}