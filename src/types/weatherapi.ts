export type OpenWeatherMapCurrentData = {
  main: { temp: number };
  weather: { main: SkyTypes }[];
};

export type CleanedUpCurrentData = {
  currentTemp: number;
  currentSkies: SkyTypes;
};

export type OpenWeatherMapForecastData = {
  list: {
    dt: number;
    temp: { day: number };
    weather: { main: SkyTypes }[];
  }[];
};
export type CleanedUpForecastData = CleanedUpForcastDay[];

export type CleanedUpForcastDay = {
  day: string;
  temp: number;
  skies: SkyTypes;
};

export type SkyTypes = "Clouds" | "Clear" | "Rain";
