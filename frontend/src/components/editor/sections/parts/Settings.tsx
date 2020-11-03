import React, { ReactElement } from "react";
import styled from "styled-components";

import FieldSet from "./Fieldset";

import media from "../../../../styled/media";

const Wrapper = styled(FieldSet)`
  flex-basis: 220px;
  flex-shrink: 0;

  ${media.tablet`
    flex: 100%;
  `}
`;

const Settings = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => <Wrapper>{children}</Wrapper>;

export default Settings;
