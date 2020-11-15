import React, { ReactElement } from "react";
import styled from "styled-components";

import FieldSet from "./Fieldset";

import media from "../../../../styled/media";

const Wrapper = styled(FieldSet)`
  flex: 1 1 0px;

  ${media.phone`
    flex: 100%;
  `};
`;

const Settings = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => <Wrapper>{children}</Wrapper>;

export default Settings;
