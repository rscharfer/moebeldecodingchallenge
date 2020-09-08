import { Store, ActionObject } from "./types/reducer";

export const INIT_STATE: Store = {
  currentSkies: "Clouds",
  currentTemp: 15,
  submittedCity: "Fake City, USA",
  forecast: [
    { day: "Tuesday", temp: 18.47, skies: "Rain" },
    { day: "Wednesday", temp: 19.18, skies: "Rain" },
    { day: "Thursday", temp: 16.41, skies: "Clouds" },
    { day: "Friday", temp: 18.07, skies: "Clear" },
    { day: "Saturday", temp: 21.25, skies: "Rain" },
  ],
  hasError: false,
  errorMessage: "",
  hasBlur: false,
};

export const reducer = (state: Store, action: ActionObject): Store => {
  switch (action.type) {
    case "submittedCitySet":
      return {
        ...state,
        submittedCity: action.submittedCity,
        hasBlur: true,
      };
    case "dataRetrievalSuccessful":
      return {
        ...state,
        currentTemp: action.currentTemp,
        currentSkies: action.currentSkies,
        forecast: action.forecast,
        hasError: false,
        errorMessage: "",
      };
    case "dataRetrievalFailed":
      return {
        ...state,
        hasError: true,
        errorMessage: action.message,
      };
    case "blurChange": {
      return {
        ...state,
        hasBlur: action.to === "on" ? true : false,
      };
    }
    default:
      return state;
  }
};
