import styled from "styled-components";

import Button from "./Button";

const SecondaryButton = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.main};
  border: 1px solid ${({ theme }) => theme.main};
`;

export default SecondaryButton;
