import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  flex: 100%;
`;

const Download = ({
  url,
  fileName,
  label,
}: {
  url: string;
  fileName: string;
  label: string;
}) => {
  return (
    <Wrapper>
      <a
        download={fileName}
        href={url}
        target={"_blank"}
        rel="noopener noreferrer"
      >
        {label}
      </a>
    </Wrapper>
  );
};

export default Download;
