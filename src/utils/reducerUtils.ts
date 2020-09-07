import { Store, ActionObject } from "../types/reducer";

export const INIT_STATE: Store = {
  currentSkies: "Clouds",
  currentTemp: 15,
  submittedCity: "Berlin",
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
        hasError: false,
      };
    case "dataRetrievalFailed":
      return {
        ...state,
        hasError: true,
      };
    default:
      return state;
  }
};
