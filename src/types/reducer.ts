import { CleanedUpForecastData, SkyTypes, RetrievalTypes } from "./weatherapi";

export type Store = {
  currentSkies: SkyTypes;
  currentTemp: number;
  submittedCity: string;
  forecast: CleanedUpForecastData;
  weatherRetrievalStatus: RetrievalTypes;
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
    }
  | {
      type: "weatherRetrievalStatusChange";
      status: RetrievalTypes;
    };
