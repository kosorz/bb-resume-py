import React from "react";
import styled, { css } from "styled-components";
import Editable from "react-contenteditable";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

import PreviewerBase from "../../resume/viewer/components/Previewer";
import ContentEditable from "../../../components/formik/ContentEditable";

import PencilIcon from "../../../components/symbols/Pencil";
import TrashIcon from "../../../components/symbols/Trash";

import media from "../../../util/media";
import ResumeShape from "../../resume/Resume.typing";
import { previewValidationSchema } from "../../../util/validationSchemas";
import { saveChangedValues, getFieldPropsMeta } from "../../../util/fns";
import { useFormikAutoSave } from "../../../util/hooks";

export const Document = styled.div`
  height: ${({ theme }) => 1.42 * 7 * theme.spaceBig + "px"};
  flex-basis: ${({ theme }) => 7 * theme.spaceBig + "px"};
  margin-right: ${({ theme }) => theme.space + "px"};
  margin-top: ${({ theme }) => theme.space + "px"};
  border-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-width: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  box-shadow: ${({ theme }) => theme.cardShadow};
  background: ${({ theme }) => theme.ivory};
  transition: ${({ theme }) => theme.cardShadowTransition};
  cursor: pointer;
  position: relative;

  ${media.phone`
    margin-right: 0;
  `};
`;

const Edit = styled(PencilIcon)`
  width: 55px;
  height: 55px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border-radius: 50%;
  fill: ${({ theme }) => theme.main};
  padding: ${({ theme }) => theme.spaceSmall + "px"};
  display: none;
`;

const Trash = styled(TrashIcon)`
  padding: ${({ theme }) => theme.spaceSmall + "px"};
  border-bottom-left-radius: ${({ theme }) => theme.spaceSmall + "px"};
  fill: ${({ theme }) => theme.darkGray};
  background: ${({ theme }) => theme.lightRed};
  right: 0;
  top: 0;
  position: absolute;
  z-index: 1;

  &:hover {
    fill: ${({ theme }) => theme.red};
  }
`;

const Previewer = styled(PreviewerBase)`
  &:hover {
    ${Edit} {
      display: block;
      background: ${({ theme }) => theme.lightMain};
      fill: ${({ theme }) => theme.main};
    }
  }
`;

const name = css`
  border-bottom-left-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  border-bottom-right-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
  padding: ${({ theme }) => theme.spaceSmall + "px"};
  min-height: ${({ theme }) => 1.5 * theme.spaceBig + "px"};
  border-top: 1px solid ${({ theme }) => theme.gray};
  background: ${({ theme }) => theme.ivory};
  color: ${({ theme }) => theme.main};
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: bold;
  margin: 0;
`;

export const Name = styled.footer`
  ${name};
`;

const ContentEditableName = styled(Editable)`
  ${name};
  outline: 0;
  cursor: text;

  &:empty:not(:focus):before {
    content: attr(data-ph);
    pointer-events: none;
  }
`;

const EditableName = ({ title, id }: { title: string; id: number }) => {
  const formik = useFormik({
    initialValues: { title },
    onSubmit: (values) => {
      saveChangedValues(values, { title }, `/resumes/${id}`);
    },
    validationSchema: previewValidationSchema,
  });
  useFormikAutoSave(formik);

  return (
    <ContentEditable
      Base={ContentEditableName}
      tagName={"p"}
      values={getFieldPropsMeta(formik, "title")}
      placeholder={`Untitled`}
    />
  );
};

const Preview = ({
  data,
  deleteFn,
}: {
  data: ResumeShape;
  deleteFn: Function;
}) => {
  const history = useHistory();

  return (
    <Document>
      <Trash onClick={() => deleteFn(data.id)} />
      <Previewer
        memoized={true}
        onClick={() => history.push(`/resume/${data.id}`)}
        bare={true}
        data={data}
      >
        <Edit />
      </Previewer>
      <EditableName title={data.title} id={data.id} />
    </Document>
  );
};

export default Preview;
