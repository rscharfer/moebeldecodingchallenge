import { CleanedUpForecastData, SkyTypes, RetrievalTypes } from "./weatherapi";

export type Store = {
  currentSkies: SkyTypes;
  currentTemp: number;
  submittedCity: string;
  forecast: CleanedUpForecastData;
  weatherRetrievalStatus: RetrievalTypes;
  hasError: boolean;
  errorMessage: string;
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
      message: string
    }
  | {
      type: "submittedCitySet";
      submittedCity: string;
    }
  | {
      type: "weatherRetrievalStatusChange";
      status: RetrievalTypes;
    };

export type ActionTypes =
  | "dataRetrievalSuccessful"
  | "dataRetrievalFailed"
  | "submittedCitySet"
  | "weatherRetrievalStatusChange";
