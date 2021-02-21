import React, { ReactNode } from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

import Box from "../../../components/Box";
import Form from "../../../components/formik/Form";
import Footer from "../../../components/BoxFooter";
import BaseError from "../../../components/formik/BaseError";

const Wrapper = styled.section`
  flex: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => 3 * theme.spaceBig + "px"};
`;

const AuthForm = styled(Form)`
  padding: ${({ theme }) => theme.spaceSmall + "px"};
`;

const AuthFooter = styled(Footer)`
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.main};
  padding: ${({ theme }) => theme.spaceSmall / 4 + "px"} 0;
`;

const FormTemplate = ({
  baseError = "",
  links,
  button,
  inputs,
  title,
}: {
  baseError: string;
  links: ReactNode | ReactNode[];
  inputs: ReactNode | ReactNode[];
  button: ReactNode;
  title?: string;
}) => {
  return (
    <Wrapper>
      <Box>
        <AuthForm>
          {inputs}
          <BaseError error={baseError} />
        </AuthForm>
        <AuthFooter>
          <LinksWrapper>{links}</LinksWrapper>
          {button}
        </AuthFooter>
      </Box>
    </Wrapper>
  );
};

export default FormTemplate;
