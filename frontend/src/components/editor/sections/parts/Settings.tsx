import React, { ReactElement } from "react";
import styled from "styled-components";

import media from "../../../../styled/media";

const Wrapper = styled.fieldset`
  border: ${({ theme }) => "1px solid" + theme.gray};
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
