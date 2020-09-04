import React, { useReducer, useEffect } from "react";
import axios from 'axios';

import GlobalStyle from "./GlobalStyle";

import {
  cleanUpCurrentWeatherData,
  cleanUpForecastData,
  createCurrentWeatherUrl,
  createForcastUrl
} from './weaterUtils'

import {
  INIT_STATE,
  reducer
} from './reducerUtils'

import { ORANGE, TEAL } from "./colors";



function App() {
  const [store, dispatch] = useReducer(reducer, INIT_STATE);

  const getBackgroundColor = (temp: number): string =>
    temp < 15 ? TEAL : ORANGE;

  useEffect(() => {
    async function fetchData(){
      try {
        const currentProm = axios.get(createCurrentWeatherUrl(store.submittedCity));
        const forecastProm = axios.get(createForcastUrl(store.submittedCity));

        // const timeLimit = () => new Promise((res, rej) => setTimeout(rej, 3000))
        const [current, forecast] = await Promise.all([currentProm, forecastProm, ])

        const { temp, skies } = cleanUpCurrentWeatherData(current.data);
        const forecastData = cleanUpForecastData(forecast.data);
       
        dispatch({
          type: 'dataRetrievalSuccessful',
          currentTemp: temp,
          currentSkies: skies,
          forecast: forecastData
        })
      }
      catch(e){
        dispatch({
          type: 'dataRetrievalFailed',
        })
      }
    }
    fetchData();
  }, [store.submittedCity]);

  return (
    <>
      <GlobalStyle bgColor={getBackgroundColor(store.currentTemp)} />
      <header>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <div>something else</div>
    </>
  );
}

export default App;
