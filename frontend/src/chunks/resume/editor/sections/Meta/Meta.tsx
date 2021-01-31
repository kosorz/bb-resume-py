import React, { useContext, ReactNode } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Section from "../../components/Section";
import Form from "../../../../../components/formik/Form";
import ColorPicker from "../../../../../components/formik/ColorPicker";
import Range from "../../../../../components/formik/Range";
import RadioGroup from "../../../../../components/formik/RadioGroup";
import Previewer from "../../../viewer/components/Previewer";

import Full from "../../../../../components/symbols/Full";
import Split from "../../../../../components/symbols/Split";
import CrossingsBackground from "../../../../../assets/backgrounds/Crossings.png";
import HectagonsBackground from "../../../../../assets/backgrounds/Hectagons.png";
import TrianglesBackground from "../../../../../assets/backgrounds/Triangles.png";
import NetBackground from "../../../../../assets/backgrounds/Net.png";
import WavesBackground from "../../../../../assets/backgrounds/Waves.png";
import WoodBackground from "../../../../../assets/backgrounds/Wood.png";
import XPartsBackground from "../../../../../assets/backgrounds/X-parts.png";

import { ResumeBubble } from "../../../Resume.bubble";
import { useFormik } from "formik";
import {
  saveChangedValues,
  getFieldPropsMeta,
  getFieldPropsMetaHelpers,
} from "../../../../../util/fns";
import { useFormikAutoSave } from "../../../../../util/hooks";

const CustomFontSizes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  div:nth-of-type(odd) {
    padding-right: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  }

  div:nth-of-type(even) {
    padding-left: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  }
`;

const FontSizeRangeHolder = styled.div`
  flex-basis: 50%;
  box-sizing: border-box;
`;

const Image = styled.img`
  background-size: contain;
  width: 100%;
  height: 100%;
`;

const Font = styled.p`
  align-self: flex-end;
  width: 100%;
  text-align: center;
  margin: 0;
  font-weight: 300;
  padding: 0 ${({ theme }) => 1.5 * theme.spaceSmall + "px"};
`;

const FontRadioGroup = styled(RadioGroup)`
  > div {
    flex-basis: ${({ theme }) => 2 * theme.space + "px"};
    height: ${({ theme }) => 1.75 * theme.space + "px"};
    width: auto;
  }
`;

const TemplateRadioGroup = styled(RadioGroup)`
  > div {
    height: auto;
    flex-basis: ${({ theme }) => 5 * theme.space + "px"};
    height: ${({ theme }) => 1.41 * 5 * theme.space + "px"};
    align-items: center;
    position: relative;
  }
`;

const Roboto = styled(Font)`
  font-family: "Roboto-Prev";
`;

const Rubik = styled(Font)`
  font-family: "Rubik-Prev";
`;

const Exo = styled(Font)`
  font-family: "Exo-Prev";
`;

const Oswald = styled(Font)`
  font-family: "Oswald-Prev";
`;

const Lato = styled(Font)`
  font-family: "Lato-Prev";
`;

const Chivo = styled(Font)`
  font-family: "Chivo-Prev";
`;

const Bitter = styled(Font)`
  font-family: "Bitter-Prev";
`;

const Meta = observer(() => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume, setResume } = resumeBubble;
  const { colors, paper, fontSize, content, ...rest } = resume.meta;
  const { id } = resume;
  const url = `/resumes/${id}`;

  const formik = useFormik({
    initialValues: resume.meta,
    onSubmit: (values) =>
      saveChangedValues(values, resume.meta, url, setResume, ["meta"]),
  });
  useFormikAutoSave(formik);

  const displayFontRange = (range: ReactNode) => {
    return <FontSizeRangeHolder>{range}</FontSizeRangeHolder>;
  };

  return (
    <Section
      identifier={"meta"}
      title={"Appearance"}
      purpose={`There are many variations of passages of Lorem Ipsum available, but 
    the majority have suffered alteration in some form, by injected humour, 
    or randomised words which.`}
    >
      <Form>
        <TemplateRadioGroup
          displayName={"template"}
          {...getFieldPropsMetaHelpers(formik, "template")}
          options={[
            {
              ownValue: "calm",
              children: (
                <Previewer data={resume} bare={true} template={"calm"} />
              ),
            },
            {
              ownValue: "classic",
              children: (
                <Previewer data={resume} bare={true} template={"classic"} />
              ),
            },
          ]}
        />
        {rest.template === "classic" && (
          <RadioGroup
            displayName={"Layout"}
            {...getFieldPropsMetaHelpers(formik, "paper.layout")}
            options={[
              { ownValue: "full", children: <Full /> },
              { ownValue: "split", children: <Split /> },
            ]}
          />
        )}
        <Range
          displayName={"Elements spacing"}
          min={40}
          max={60}
          step={5}
          {...getFieldPropsMeta(formik, "paper.space")}
        />
        <hr />
        <FontRadioGroup
          displayName={"font"}
          {...getFieldPropsMetaHelpers(formik, "fontFamily")}
          options={[
            { ownValue: "Roboto", children: <Roboto>Roboto</Roboto> },
            { ownValue: "Rubik", children: <Rubik>Rubik</Rubik> },
            { ownValue: "Exo", children: <Exo>Exo</Exo> },
            { ownValue: "Oswald", children: <Oswald>Oswald</Oswald> },
            { ownValue: "Lato", children: <Lato>Lato</Lato> },
            { ownValue: "Chivo", children: <Chivo>Chivo</Chivo> },
            { ownValue: "Bitter", children: <Bitter>Bitter</Bitter> },
          ]}
        />
        <ColorPicker
          displayName={"Text shade"}
          {...getFieldPropsMetaHelpers(formik, "colors.secondary")}
        />
        <CustomFontSizes>
          {displayFontRange(
            <Range
              displayName={"contents size"}
              min={10}
              max={12}
              step={1}
              {...getFieldPropsMeta(formik, "fontSize.small")}
            />
          )}
          {displayFontRange(
            <Range
              displayName={"name size"}
              min={34}
              max={42}
              step={1}
              {...getFieldPropsMeta(formik, "fontSize.big")}
            />
          )}
          {displayFontRange(
            <Range
              displayName={"headlines size"}
              min={20}
              max={24}
              step={1}
              {...getFieldPropsMeta(formik, "fontSize.large")}
            />
          )}
          {displayFontRange(
            <Range
              displayName={"Titles size"}
              min={15}
              max={17}
              step={1}
              {...getFieldPropsMeta(formik, "fontSize.medium")}
            />
          )}
        </CustomFontSizes>
        <hr />
        {rest.template === "classic" && (
          <>
            <ColorPicker
              displayName={"Accents color"}
              {...getFieldPropsMetaHelpers(formik, "colors.main")}
            />
            <RadioGroup
              displayName={"Page background"}
              {...getFieldPropsMetaHelpers(formik, "background")}
              options={[
                { ownValue: "" },
                {
                  ownValue: "Crossings",
                  children: <Image src={CrossingsBackground} />,
                },
                {
                  ownValue: "Hectagons",
                  children: <Image src={HectagonsBackground} />,
                },
                { ownValue: "Net", children: <Image src={NetBackground} /> },
                {
                  ownValue: "Waves",
                  children: <Image src={WavesBackground} />,
                },
                {
                  ownValue: "Triangles",
                  children: <Image src={TrianglesBackground} />,
                },
                { ownValue: "Wood", children: <Image src={WoodBackground} /> },
                {
                  ownValue: "X-parts",
                  children: <Image src={XPartsBackground} />,
                },
              ]}
            />
          </>
        )}
      </Form>
    </Section>
  );
});

export default Meta;
