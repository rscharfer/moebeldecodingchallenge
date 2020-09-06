import { CleanedUpForecastData } from "./weatherapi.types";

export type Store = {
  currentSkies: string;
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
      currentSkies: string;
      forecast: CleanedUpForecastData;
    }
  | {
      type: "dataRetrievalFailed";
    }
  | {
      type: "submittedCitySet";
      submittedCity: string;
    };
