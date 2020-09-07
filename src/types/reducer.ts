import { CleanedUpForecastData, SkyTypes } from "./weatherapi";

export type Store = {
  currentSkies: SkyTypes;
  currentTemp: number;
  submittedCity: string;
  forecast: CleanedUpForecastData;
  weatherRetrievalStatus: "idle" | "inputHasFocus" | "retrievingData";
  hasError: boolean;
};

export type ActionObject =
  | {
      type: "dataRetrievalSuccessful";
      currentTemp: number;
      currentSkies: SkyTypes;
      forecast: CleanedUpForecastData;
    }
  | {
      type: "dataRetrievalFailed";
    }
  | {
      type: "submittedCitySet";
      submittedCity: string;
    };
