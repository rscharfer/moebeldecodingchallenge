export type OpenWeatherMapCurrentData = {
  main: { temp: number };
  weather: { main: SkyTypes }[];
};

export type CleanedUpCurrentData = {
  temp: number;
  skies: SkyTypes;
};

export type OpenWeatherMapForecastData = {
  list: {
    dt: number;
    temp: { day: number };
    weather: { main: SkyTypes }[];
  }[];
};
export type CleanedUpForecastData = {
  day: string;
  temp: number;
  skies: SkyTypes;
}[];

export type SkyTypes = "Clouds" | "Clear" | "Rain";

export type RetrievalTypes = "idle" | "inputHasFocus" | "retrievingData";
