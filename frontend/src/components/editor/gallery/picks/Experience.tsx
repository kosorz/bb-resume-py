import React, { useContext } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";

import Pick from "./parts/Pick";
import PickHeadline from "./parts/PickHeadline";
import SubPickHeadline from "./parts/SubPickHeadline";
import { observer } from "mobx-react-lite";
import { ResumeBubble } from "../../../../bubbles/ResumeBubble";
import Data from "../../../viewer/sections/parts/Data";

const CompanyName = styled.h5`
  margin: 0;
  font-weight: bold;
  font-size: 14px;
`;

const Content = styled.div`
  font-size: 10px;
`;

const TimeAndGeo = styled.div`
  display: flex;
`;

const Experience = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume } = resumeBubble;
  const { meta } = resume;
  const { colors } = meta!;
  return (
    <Pick identifier={"experience"}>
      <PickHeadline>Experience</PickHeadline>
      <SubPickHeadline>Frontend Developer</SubPickHeadline>
      <CompanyName style={{ color: colors.main }}>Google</CompanyName>
      <Content>
        <TimeAndGeo>
          <Data
            bare={true}
            type={"date"}
            value={DateTime.fromISO("2020-11-26T20:38:17+00:00").toFormat(
              "MM/yyyy"
            )}
          />
          <Data bare={true} type={"location"} />
        </TimeAndGeo>
        <Data bare={true} type={"link"} />
      </Content>
      <Content>
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged.
      </Content>
    </Pick>
  );
});

export default Experience;
