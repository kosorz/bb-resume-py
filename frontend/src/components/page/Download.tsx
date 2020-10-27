import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  left: 20px;
  bottom: 20px;
`;

const Download = ({ url }: { url: string }) => {
  return (
    <Wrapper>
      <a
        download={"document.pdf"}
        href={url}
        target={"_blank"}
        rel="noopener noreferrer"
      >
        Download Free
      </a>
    </Wrapper>
  );
};

export default Download;
