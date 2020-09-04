import { Store, ActionObject } from './reducer.types';


export const INIT_STATE: Store = {
  currentSkies: "cloudy",
  currentTemp: 15,
  submittedCity: "New York City",
  forecast: [],
  weatherRetrievalStatus: "idle",
  hasError: false,
};

export const reducer = (state: Store, action: ActionObject): Store => {
  switch (action.type) {
    case "dataRetrievalSuccessful":
      return {
        ...state,
        currentTemp: action.currentTemp,
        currentSkies: action.currentSkies,
        forecast: action.forecast,
        hasError: false
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