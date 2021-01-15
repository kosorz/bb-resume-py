import styled from "styled-components";

import Button from "./Button";

const DangerButton = styled(Button)`
  background: ${({ theme }) => theme.red};
  color: ${({ theme }) => theme.white};
`;

export default DangerButton;
