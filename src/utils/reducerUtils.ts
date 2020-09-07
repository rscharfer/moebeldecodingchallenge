import { Store, ActionObject } from "../types/reducer";

export const INIT_STATE: Store = {
  currentSkies: "Clouds",
  currentTemp: 15,
  submittedCity: "Fake City, USA",
  forecast: [
    {
      day: "Monday",
      temp: 23,
      skies: "cloudy",
    },
  ],
  weatherRetrievalStatus: "idle",
  hasError: false,
};

export const reducer = (state: Store, action: ActionObject): Store => {
  switch (action.type) {
    case "submittedCitySet":
      return {
        ...state,
        submittedCity: action.submittedCity,
      };
    case "dataRetrievalSuccessful":
      return {
        ...state,
        currentTemp: action.currentTemp,
        currentSkies: action.currentSkies,
        forecast: action.forecast,
        weatherRetrievalStatus: "idle",
        hasError: false,
      };
    case "dataRetrievalFailed":
      return {
        ...state,
        hasError: true,
        weatherRetrievalStatus: "idle",
      };
    case "weatherRetrievalStatusChange":
      return {
        ...state,
        weatherRetrievalStatus: action.status,
      };
    default:
      return state;
  }
};
