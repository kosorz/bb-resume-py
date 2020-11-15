import React, { ReactElement } from "react";
import styled from "styled-components";

import media from "../../../../styled/media";

const Wrapper = styled.form`
  display: flex;
  flex-wrap: nowrap;

  ${media.phone`
    flex-wrap: wrap;
  `}
`;

const Form = ({ children }: { children: ReactElement | ReactElement[] }) => (
  <Wrapper>{children}</Wrapper>
);

export default Form;
