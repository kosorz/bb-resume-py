import styled from "styled-components";
import { ReactComponent as UploadIcon } from "../../assets/icons/Upload.svg";

const Upload = styled(UploadIcon)`
  fill: ${({ theme }) => theme.white};

  &:hover {
    background: ${({ theme }) => theme.lightGreen};
    fill: ${({ theme }) => theme.green};
    cursor: pointer;
  }
`;

export default Upload;
