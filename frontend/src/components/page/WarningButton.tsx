import styled from "styled-components";

import Button from "./Button";

const WarningButton = styled(Button)`
  background: ${({ theme }) => theme.orange};
`;

export default WarningButton;
