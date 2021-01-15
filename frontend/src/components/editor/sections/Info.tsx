import React, { useContext } from "react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Input from "../../page/formik/Input";
import Area from "../../page/formik/Area";
import Section from "./parts/Section";
import Form from "../../page/formik/Form";
import InfoPhoto from "./parts/InfoPhoto";
import VisibilityToggle from "../../page/VisibilityToggle";
import LockToggle from "../../page/LockToggle";
import { Title } from "../Editor";
import { Footer } from "./parts/Section";

import { infoValidationSchema } from "../validationSchemas";
import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { getFieldPropsMeta, saveChangedValues } from "../../../util/fns";
import { useFormikAutoSave } from "../../../util/hooks";

export const PhotoDisclaimer = styled(Footer)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  font-size: ${({ theme }) => theme.smallFont};
  background: ${({ theme }) => theme.ivory};
`;

const PhotoVisibilityToggle = styled(VisibilityToggle)`
  position: absolute;
  bottom: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  right: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  margin: ${({ theme }) => theme.spaceSmall / 2 + "px"};
`;

const PhotoLockToggle = styled(LockToggle)`
  position: absolute;
  bottom: ${({ theme }) => theme.spaceBig + theme.spaceSmall / 2 + "px"};
  right: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  margin: ${({ theme }) => theme.spaceSmall / 2 + "px"};
`;

const Info = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume, updateInfo } = resumeBubble;
  const { resume_id, cropped_photo, photo, ...infoEditorData } = resume.info!;
  const { template } = resume.meta!;

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
          template === "classic" && (
            <>
              <InfoPhoto
                toggles={
                  <>
                    <PhotoVisibilityToggle
                      {...getFieldPropsMeta(formik, "photo_enabled")}
                    />
                    <PhotoLockToggle
                      {...getFieldPropsMeta(formik, "photo_locked")}
                    />
                  </>
                }
              />
              <PhotoDisclaimer>
                Keep in mind that in some US states, having a photo on your
                resume is forbidden.
              </PhotoDisclaimer>
            </>
          )
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
            toggle={
              <VisibilityToggle
                {...getFieldPropsMeta(formik, "role_enabled")}
              />
            }
          />
          <Input
            {...getFieldPropsMeta(formik, "phone")}
            placeholder="Enter your phone number"
            toggle={
              <VisibilityToggle
                {...getFieldPropsMeta(formik, "phone_enabled")}
              />
            }
          />
          <Input
            {...getFieldPropsMeta(formik, "email")}
            placeholder="Enter your email address"
            toggle={
              <VisibilityToggle
                {...getFieldPropsMeta(formik, "email_enabled")}
              />
            }
          />
          <Input
            {...getFieldPropsMeta(formik, "link")}
            placeholder="Enter link to your website"
            toggle={
              <VisibilityToggle
                {...getFieldPropsMeta(formik, "link_enabled")}
              />
            }
          />
          <Input
            {...getFieldPropsMeta(formik, "location")}
            placeholder="Enter your location"
            toggle={
              <VisibilityToggle
                {...getFieldPropsMeta(formik, "location_enabled")}
              />
            }
          />
          {template === "calm" && (
            <Area
              {...getFieldPropsMeta(formik, "quote")}
              placeholder="Enter your quote"
              toggle={
                <VisibilityToggle
                  {...getFieldPropsMeta(formik, "quote_enabled")}
                />
              }
            />
          )}
        </Form>
      </Section>
    </>
  );
});

export default Info;
