import React from "react";
import styled from "styled-components";
import { CleanedUpForecastData } from "../types/weatherapi";
import { ReactComponent as Degree } from "../svgs/degree.svg";

import { skiesMap } from "../utils/weatherUtils";

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
  forecast: CleanedUpForecastData;
  className: string;
};

const List = ({ forecast, className }: ListProps) => (
  <ul className={className}>
    {forecast.map((day) => {
      const WeatherIcon = skiesMap[day.skies];
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
  </ul>
);

const StyledList = styled(List)`
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

export default StyledList;
