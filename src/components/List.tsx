import React from "react";
import styled from "styled-components";
import { CleanedUpForcastDay } from "../types/weatherapi";
import { ReactComponent as Degree } from "../svgs/degree.svg";
import { ReactComponent as FallbackIcon } from "../svgs/clear.svg";

import { createForcastUrl, cleanUpForecastData } from "../utils/weatherUtils";

import { skiesMap } from "../utils/weatherUtils";
import { useFetcher } from "../hooks/useFetcher";

const StyledListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledDay = styled.span``;

const StyledTempAndSkies = styled.span`
  position: relative;
`;
const StyledDegreesGroup = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  line-height: 44px;
  right: 2.25rem;
`;

const StyledDegrees = styled.span`
  position: absolute;
  top: -3px;
  left: 3px;
`;

const StyledWeatherIcon = styled.span`
  position: absolute;
  bottom: -4px;
`;

type ListProps = {
  submittedCity: string;
};

const List = ({ submittedCity }: ListProps) => {
  const { status: fstatus, data: forecast } = useFetcher(
    [
      { day: "Tuesday", temp: 18.47, skies: "Rain" },
      { day: "Wednesday", temp: 19.18, skies: "Rain" },
      { day: "Thursday", temp: 16.41, skies: "Clouds" },
      { day: "Friday", temp: 18.07, skies: "Clear" },
      { day: "Saturday", temp: 21.25, skies: "Rain" },
    ],
    createForcastUrl(submittedCity),
    cleanUpForecastData
  );

  if (fstatus === "rejected") {
    throw new Error(
      `There is no data for the city ${submittedCity}. Click reset and enter a new city.`
    );
  }

  return (
    <Wrapper>
      {forecast.map((day: CleanedUpForcastDay) => {
        const WeatherIcon = skiesMap[day.skies] || FallbackIcon;
        return (
          <StyledListItem key={day.day}>
            <StyledDay>{day.day}</StyledDay>
            <StyledTempAndSkies>
              <StyledDegreesGroup>
                <span>{Math.round(day.temp)}</span>
                <StyledDegrees>
                  <Degree height="60px" />
                </StyledDegrees>
              </StyledDegreesGroup>
              <StyledWeatherIcon>
                <WeatherIcon height="40px" />
              </StyledWeatherIcon>
            </StyledTempAndSkies>
          </StyledListItem>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  margin: 1rem auto;
  width: 30%;
  min-width: 300px;
  font-size: 1.25rem;
  position: relative;

  list-style: none;
  text-align: center;

  @media (max-width: 768px) {
    margin-right: 7rem;
    margin-left: -1rem;
  }
`;

export default List;
