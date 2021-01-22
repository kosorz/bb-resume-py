import styled from "styled-components";

import SecondaryButton from "./SecondaryButton";

const LinkButton = styled(SecondaryButton)`
  border: 1px solid transparent;

  &:hover:not(:disabled) {
    border: 1px solid ${({ theme }) => theme.main};
  }
`;

export default LinkButton;
