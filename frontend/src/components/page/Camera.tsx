import styled from "styled-components";
import { ReactComponent as CameraIcon } from "./icons/Camera.svg";

const Camera = styled(CameraIcon)`
  fill: ${({ theme }) => theme.white};

  &:hover {
    background: ${({ theme }) => theme.lightGreen};
    fill: ${({ theme }) => theme.green};
    cursor: pointer;
  }
`;

export default Camera;
