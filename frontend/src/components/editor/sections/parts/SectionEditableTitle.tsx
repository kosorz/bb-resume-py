import React, { useRef, useContext } from "react";
import styled from "styled-components";
import Editable from "react-contenteditable";
import { observer } from "mobx-react-lite";

import Form from "./Form";
import { FieldInputProps, FieldMetaProps } from "formik";
import { ResumeBubble } from "../../../../bubbles/ResumeBubble";

const EditableTitle = styled(Editable)`
  outline: 0;
  min-width: 150px;
  word-break: break-all;

  &:focus {
    border-bottom: 1px solid;
  }

  &:empty:not(:focus):before {
    content: attr(data-ph);
    pointer-events: none;
  }
`;

const SectionEditableTitle = observer(
  ({
    values,
    title,
  }: {
    title: string;
    values: FieldInputProps<any> & FieldMetaProps<any>;
  }) => {
    const resumeBubble = useContext(ResumeBubble);
    const { colors } = resumeBubble.resume.meta!;
    const titleRef = useRef<HTMLHeadingElement>(null);

    return (
      <Form>
        <EditableTitle
          style={{ color: colors.main, borderColor: colors.main }}
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
      </Form>
    );
  }
);

export default SectionEditableTitle;
