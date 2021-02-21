import React, { useRef, ElementType, ChangeEvent } from "react";
import { FieldInputProps, FieldMetaProps } from "formik";

const ContentEditable = ({
  Base,
  values,
  placeholder,
  tagName,
}: {
  Base: ElementType;
  placeholder: string;
  values: FieldInputProps<any> & FieldMetaProps<any>;
  tagName: "h2" | "p";
}) => {
  const self = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

  return (
    <Base
      onChange={(e: ChangeEvent) => {
        values.onChange({
          ...e,
          target: { ...e.target, name: values.name },
        });
      }}
      data-ph={placeholder}
      innerRef={self}
      html={values.value}
      tagName={tagName}
    />
  );
};

export default ContentEditable;
