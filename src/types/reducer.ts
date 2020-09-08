import { CleanedUpForecastData, SkyTypes } from "./weatherapi";

export type Store = {
  currentSkies: SkyTypes;
  currentTemp: number;
  submittedCity: string;
  forecast: CleanedUpForecastData;
  hasError: boolean;
  errorMessage: string;
  hasBlur: boolean;
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
      message: string;
    }
  | {
      type: "submittedCitySet";
      submittedCity: string;
    }
  | {
      type: "blurChange";
      to: "on" | "off";
    };

export type ActionTypes =
  | "dataRetrievalSuccessful"
  | "dataRetrievalFailed"
  | "submittedCitySet";
