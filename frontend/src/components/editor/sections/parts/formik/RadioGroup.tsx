import React, { ReactNode } from "react";
import styled from "styled-components";
import { FieldInputProps, FieldHelperProps, FieldMetaProps } from "formik";
import Radio from "./Radio";
import Field from "./Field";

const RadioGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spaceSmall + "px"};
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;

  > div {
    flex-basis: ${({ theme }) => theme.spaceBig * 2 + "px"};
    height: ${({ theme }) => theme.spaceBig * 2 + "px"};
    margin-right: ${({ theme }) => theme.spaceSmall / 2 + "px"};
    margin-top: ${({ theme }) => theme.spaceSmall / 2 + "px"};
    flex-shrink: 0;
    display: flex;
  }
`;

const FormikRadioGroup = ({
  options,
  displayName,
  initialTouched,
  initialError,
  initialValue,
  touched,
  error,
  className,
  ...rest
}: FieldInputProps<any> &
  FieldMetaProps<any> &
  FieldHelperProps<any> & {
    options: { ownValue: string; children?: ReactNode | ReactNode[] }[];
    displayName?: string;
    className?: string;
  }) => {
  return (
    <Field name={displayName || rest.name} touched={touched} error={error}>
      <RadioGroup className={className}>
        {options.map((o) => (
          <Radio key={`radio-${o.ownValue}`} {...rest} ownValue={o.ownValue}>
            {o.children}
          </Radio>
        ))}
      </RadioGroup>
    </Field>
  );
};

export default FormikRadioGroup;
