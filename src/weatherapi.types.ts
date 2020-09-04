export type OpenWeatherMapCurrentData = {
  main : { temp : number }; 
  weather: { main: string }[];
}


export type CleanedUpCurrentData = {temp : number, skies: string}

export type OpenWeatherMapForecastData = {
  list : {
    dt: number;
    temp: {day: number};
    weather: {main: string}[]
  }[]
}
export type CleanedUpForecastData = {
  day: string,
  temp: number,
  skies: string,
}[]