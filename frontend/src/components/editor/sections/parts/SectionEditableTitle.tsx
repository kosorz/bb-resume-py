import React, { useRef } from "react";
import { FieldInputProps, FieldMetaProps } from "formik";
import styled from "styled-components";
import Editable from "react-contenteditable";
import { observer } from "mobx-react-lite";

import Form from "./formik/Form";

const EditableTitle = styled(Editable)`
  margin-top: ${({ theme }) => theme.space + "px"};
  color: ${({ theme }) => theme.main};
  outline: 0;
  min-width: 150px;
  word-break: break-all;
  text-align: center;

  &:focus {
    border-bottom: 1px solid;
  }

  &:empty:not(:focus):before {
    content: attr(data-ph);
    pointer-events: none;
  }
`;

const TitleForm = styled(Form)`
  flex: 100%;
`;

const SectionEditableTitle = observer(
  ({
    values,
    title,
  }: {
    title: string;
    values: FieldInputProps<any> & FieldMetaProps<any>;
  }) => {
    const titleRef = useRef<HTMLHeadingElement>(null);

    return (
      <TitleForm>
        <EditableTitle
          onChange={(e) => {
            values.onChange({
              ...e,
              target: { ...e.target, name: values.name },
            });
          }}
          data-ph={title}
          innerRef={titleRef}
          html={values.value}
          tagName={"h2"}
        />
      </TitleForm>
    );
  }
);

export default SectionEditableTitle;
