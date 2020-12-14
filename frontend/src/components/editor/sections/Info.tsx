import React, { useContext } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Toggle from "./parts/formik/Toggle";
import Input from "./parts/formik/Input";
import Section from "./parts/Section";
import Form from "./parts/formik/Form";
import InfoPhoto from "./parts/InfoPhoto";
import { Title } from "../Editor";
import { PhotoDisclaimer } from "./parts/Section";

import { infoValidationSchema } from "../validationSchemas";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { getFieldPropsMeta, saveChangedValues } from "../../../util/fns";
import { useFormikAutoSave } from "../../../util/hooks";

const PhotoToggle = styled(Toggle)`
  position: absolute;
  bottom: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  right: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  margin: ${({ theme }) => theme.spaceSmall / 2 + "px"};
`;

const Info = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume, updateInfo } = resumeBubble;
  const { resume_id, cropped_photo, photo, ...infoEditorData } = resume.info!;

  const formik = useFormik({
    initialValues: infoEditorData,
    onSubmit: (values) =>
      saveChangedValues(
        values,
        infoEditorData,
        `/parts/${resume_id}/info`,
        updateInfo
      ),
    validationSchema: infoValidationSchema,
  });
  useFormikAutoSave(formik);

  return (
    <>
      <Title>Basic Information</Title>
      <Section
        identifier={"info"}
        title={"Info"}
        contentForehead={
          <>
            <InfoPhoto
              toggle={
                <PhotoToggle {...getFieldPropsMeta(formik, "photo_enabled")} />
              }
            />
            <PhotoDisclaimer>
              Keep in mind that in some US states, having a photo on your resume
              is forbidden.
            </PhotoDisclaimer>
          </>
        }
        purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
      >
        <Form>
          <Input
            {...getFieldPropsMeta(formik, "name")}
            placeholder="Enter your name"
          />
          <Input
            {...getFieldPropsMeta(formik, "role")}
            placeholder="Enter your role"
            toggle={<Toggle {...getFieldPropsMeta(formik, "role_enabled")} />}
          />
          <Input
            {...getFieldPropsMeta(formik, "phone number")}
            placeholder="Enter your phone number"
            toggle={<Toggle {...getFieldPropsMeta(formik, "phone_enabled")} />}
          />
          <Input
            {...getFieldPropsMeta(formik, "email")}
            placeholder="Enter your email address"
            toggle={<Toggle {...getFieldPropsMeta(formik, "email_enabled")} />}
          />
          <Input
            {...getFieldPropsMeta(formik, "link")}
            placeholder="Enter link to your website"
            toggle={<Toggle {...getFieldPropsMeta(formik, "link_enabled")} />}
          />
          <Input
            {...getFieldPropsMeta(formik, "location")}
            placeholder="Enter your location"
            toggle={
              <Toggle {...getFieldPropsMeta(formik, "location_enabled")} />
            }
          />
        </Form>
      </Section>
    </>
  );
});

export default Info;
