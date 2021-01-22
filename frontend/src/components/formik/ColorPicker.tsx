import React from "react";
import styled from "styled-components";
import { FieldInputProps, FieldHelperProps, FieldMetaProps } from "formik";
import { CirclePicker as Picker } from "react-color";

import Field from "./Field";

import theme from "../../util/theme";

const PickerWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.spaceSmall + "px"};
  flex: 100%;
  margin: auto;

  > div > span > div {
    background-size: ${({ theme }) => theme.space + "px"};
    background: url(/icons/Check.svg);
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const ColorPicker = ({
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
    main: ["#038cff", "#ff0105", "#ff6e04", "#88b04b", "#92a8d1", "#a303cb"],
    secondary: ["#000000", "#1f1f1f", "#434343"],
  };

  return (
    <Field name={displayName || rest.name} touched={touched} error={error}>
      <PickerWrapper>
        <Picker
          color={rest.value}
          colors={colors[rest.name]}
          onChangeComplete={(val) => setValue(val.hex)}
          circleSpacing={theme.spaceSmall / 2}
        />
      </PickerWrapper>
    </Field>
  );
};

export default ColorPicker;
