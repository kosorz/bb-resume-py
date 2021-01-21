import styled from "styled-components";
import { ReactComponent as ImageIcon } from "../../assets/icons/Image.svg";

const Image = styled(ImageIcon)`
  fill: ${({ theme }) => theme.white};

  &:hover {
    background: ${({ theme }) => theme.lightGreen};
    fill: ${({ theme }) => theme.green};
    cursor: pointer;
  }
`;

export default Image;
