import React from "react";
import { Collapse } from "react-collapse";
import Error from "./Error";
import styled from "styled-components";

const FormikBaseError = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  text-align: center;
`;

const Hr = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.gray};
`;

const BaseError = ({ error }: { error: string }) => (
  <FormikBaseError>
    <Collapse isOpened={!!error}>
      <Hr />
      <Error bare={true} error={error} touched={true} />
    </Collapse>
  </FormikBaseError>
);

export default BaseError;
