import React from "react";
import styled from "styled-components";

import { useFetcher } from "../hooks/useFetcher";

import {
  createCurrentWeatherUrl,
  cleanUpCurrentWeatherData,
} from "../utils/weatherUtils";

import { CleanedUpCurrentData } from "../types/weatherapi";
import { ReactComponent as Degree } from "../svgs/degree.svg";
import { ReactComponent as FallbackIcon } from "../svgs/clear.svg";

import { skiesMap } from "../utils/weatherUtils";

type CurrentConditionsProps = {
  submittedCity: string;
  onTempChange: (temp: number) => void;
};

const ConditionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 2rem;
  margin-top: -4rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 18.75rem;
  margin: 1rem auto 1rem;
  height: 9.5rem;
  justify-content: space-between;
`;
const NumberWrapper = styled.div`
  color: rgb(43, 18, 2);
  font-weight: 900;
  font-size: 100px;
`;

const DegreeWrapper = styled.div`
  margin-left: -4.75rem;
  padding-top: 2rem;
`;

const SkyWrapper = styled.div`
  padding-bottom: 0.25rem;
  padding-right: 0.25rem;
`;

const SelectedCityWrapper = styled.div`
  text-align: center;
`;

const CurrentConditions = ({
  submittedCity,
  onTempChange,
}: CurrentConditionsProps) => {
  const { status: cwStatus, data: cwData, error: cwError } = useFetcher(
    { currentTemp: 20, currentSkies: "Clouds" },
    createCurrentWeatherUrl(submittedCity),
    cleanUpCurrentWeatherData
  );

  const { currentTemp, currentSkies }: CleanedUpCurrentData = cwData;
  onTempChange(currentTemp);
  // get the correct SVG component based what the API sends back for "skies" or fallback svg if unhandled skies
  const SkyComponent = skiesMap[currentSkies] || FallbackIcon;

  if (cwStatus === "rejected")
    throw Error(
      `There is no current weather data for the city ${submittedCity}`
    );

  return (
    <Wrapper>
      <SelectedCityWrapper>
        Weather for: {submittedCity || "No city given"}
      </SelectedCityWrapper>
      <ConditionsWrapper>
        <SkyWrapper>
          <SkyComponent height={60} />
        </SkyWrapper>
        <NumberWrapper>{Math.round(currentTemp)}</NumberWrapper>
        <DegreeWrapper>
          <Degree height={200} />
        </DegreeWrapper>
      </ConditionsWrapper>
    </Wrapper>
  );
};

export default CurrentConditions;
