import styled from "styled-components";

import DangerButton from "./DangerButton";

const SuccessButton = styled(DangerButton)`
  background: ${({ theme }) => theme.green};
`;

export default SuccessButton;
