import React, { useContext } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Toggle from "./parts/Toggle";
import Input from "./parts/formik/Input";
import Section from "./parts/Section";
import Form from "./parts/formik/Form";
import Values from "./parts/Values";
import InfoPhoto from "./parts/InfoPhoto";
import { Title } from "../Editor";

import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { getFieldProps, saveChangedValues } from "../../../util/fns";
import { useFormikAutoSave } from "../../../util/hooks";
import { infoValidationSchema } from "../validationSchemas";

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
          <InfoPhoto
            toggle={<PhotoToggle {...getFieldProps(formik, "photo_enabled")} />}
          />
        }
        purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
      >
        <Form>
          <Values>
            <Input
              {...getFieldProps(formik, "name")}
              placeholder="Enter your name"
            />
            <Input
              {...getFieldProps(formik, "role")}
              placeholder="Enter your role"
              toggle={<Toggle {...getFieldProps(formik, "role_enabled")} />}
            />
            <Input
              {...getFieldProps(formik, "phone number")}
              placeholder="Enter your phone number"
              toggle={<Toggle {...getFieldProps(formik, "phone_enabled")} />}
            />
            <Input
              {...getFieldProps(formik, "email")}
              placeholder="Enter your email address"
              toggle={<Toggle {...getFieldProps(formik, "email_enabled")} />}
            />
            <Input
              {...getFieldProps(formik, "link")}
              placeholder="Enter link to your website"
              toggle={<Toggle {...getFieldProps(formik, "link_enabled")} />}
            />
            <Input
              {...getFieldProps(formik, "location")}
              placeholder="Enter your location"
              toggle={<Toggle {...getFieldProps(formik, "location_enabled")} />}
            />
          </Values>
        </Form>
      </Section>
    </>
  );
});

export default Info;
