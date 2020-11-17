import React from "react";
import { FieldInputProps, FieldHelperProps, FieldMetaProps } from "formik";
import { GithubPicker as Picker } from "react-color";

import FormikField from "./Field";
import styled from "styled-components";

const PickerWrapper = styled.div`
  flex: 100%;
  margin: ${({ theme }) => theme.spaceSmall / 2 + "px"} 0;
`;

const FormikColorPicker = ({
  setValue,
  displayName,
  initialTouched,
  initialError,
  initialValue,
  touched,
  error,
  ...rest
}: { displayName?: string } & FieldInputProps<any> &
  FieldHelperProps<any> &
  FieldMetaProps<any>) => {
  const colors: { [key: string]: string[] } = {
    main: [
      "#34568b",
      "#ff6f61",
      "#6b5b95",
      "#88b04b",
      "#f7cac9",
      "#92a8d1",
      "#955251",
      "#b565a7",
    ],
    secondary: [
      "#000000",
      "#141414",
      "#1f1f1f",
      "#262626",
      "#434343",
      "#595959",
      "#8c8c8c",
      "#bfbfbf",
    ],
  };

  return (
    <>
      <FormikField
        name={displayName || rest.name}
        touched={touched}
        error={error}
      >
        <PickerWrapper>
          <Picker
            color={rest.value}
            colors={colors[rest.name]}
            triangle={"hide"}
            onChangeComplete={(val) => setValue(val.hex)}
          />
        </PickerWrapper>
      </FormikField>
    </>
  );
};

export default FormikColorPicker;
