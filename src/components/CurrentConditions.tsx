import React from "react";
import styled from "styled-components";

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
  temp,
  selectedCity,
  skies,
}: CurrentConditionsProps) => {
  const SkyComponent = skiesMap[skies];

  return (
    <Wrapper>
      <SelectedCityWrapper>{selectedCity}</SelectedCityWrapper>
      <ConditionsWrapper>
        <SkyWrapper>
          <SkyComponent height={60} />
        </SkyWrapper>
        <NumberWrapper>{Math.round(temp)}</NumberWrapper>
        <DegreeWrapper>
          <Degree height={200} />
        </DegreeWrapper>
      </ConditionsWrapper>
    </Wrapper>
  );
};

export default CurrentConditions;
