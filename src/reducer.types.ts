export type Store = {
  currentSkies: string;
  currentTemp: number;
  submittedCity: string;
  forecast: object[] | [];
  weatherRetrievalStatus: "idle" | "inputHasFocus" | "retrievingData";
  hasError: boolean;
};

export type ActionObject = {
  type: "dataRetrievalSuccessful";
  currentTemp: number;
  currentSkies: string;
  forecast: object[]
} | {
  type: "dataRetrievalFailed";
};