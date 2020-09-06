import React from "react";

import { SkyTypes } from './weatherapi.types'

import { ReactComponent as Clear } from "./clear.svg";
import { ReactComponent as Cloudy } from "./cloudy.svg";
import { ReactComponent as Rain } from "./rain.svg";
import { ReactComponent as Degree } from "./degree.svg";

type CurrentConditionsProps = {
  temp: number;
  selectedCity: string;
  skies: SkyTypes;
};

const skiesMap = {
  Clouds: Cloudy,
  Clear: Clear,
  Rain: Rain,
};

const CurrentConditions = ({
  temp,
  selectedCity,
  skies,
}: CurrentConditionsProps) => {
  const SkyComponent = skiesMap[skies];
  console.log("sc", skies);
  return (
    <>
      {selectedCity}
      <SkyComponent height={100} />
      {temp}
      <Degree height={100} />
    </>
  );
};

export default CurrentConditions;
