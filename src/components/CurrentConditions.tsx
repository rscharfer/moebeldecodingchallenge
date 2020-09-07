import React from "react";

import { SkyTypes } from "../types/weatherapi";

import { ReactComponent as Clear } from "../svgs/clear.svg";
import { ReactComponent as Cloudy } from "../svgs/cloudy.svg";
import { ReactComponent as Rain } from "../svgs/rain.svg";
import { ReactComponent as Degree } from "../svgs/degree.svg";

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
