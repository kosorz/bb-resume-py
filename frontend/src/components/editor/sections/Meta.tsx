import React, { useContext, ReactNode } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Section from "./parts/Section";
import Form from "./parts/formik/Form";
import ColorPicker from "./parts/formik/ColorPicker";
import Range from "./parts/formik/Range";
import RadioGroup from "./parts/formik/RadioGroup";

import Full from "../../page/Full";
import Split from "../../page/Split";
import CrossingsBackground from "../../page/backgrounds/Crossings.png";
import HectagonsBackground from "../../page/backgrounds/Hectagons.png";
import TrianglesBackground from "../../page/backgrounds/Triangles.png";
import NetBackground from "../../page/backgrounds/Net.png";
import WavesBackground from "../../page/backgrounds/Waves.png";
import WoodBackground from "../../page/backgrounds/Wood.png";
import XPartsBackground from "../../page/backgrounds/X-parts.png";

import { ResumeBubble } from "../../../bubbles/ResumeBubble";
import { useFormik } from "formik";
import {
  saveChangedValues,
  getFieldPropsMeta,
  getFieldPropsMetaHelpers,
} from "../../../util/fns";
import { useFormikAutoSave } from "../../../util/hooks";

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
  const { colors, paper, fontSize, content, ...rest } = resume.meta!;
  const { id } = resume;

  const url = `/resumes/${id}`;

  const colorsFormik = useFormik({
    initialValues: colors,
    onSubmit: (values) =>
      saveChangedValues(values, colors, url, setResume, ["meta", "colors"]),
  });
  useFormikAutoSave(colorsFormik, 0);

  const paperFormik = useFormik({
    initialValues: paper,
    onSubmit: (values) =>
      saveChangedValues(values, paper, url, setResume, ["meta", "paper"]),
  });
  useFormikAutoSave(paperFormik);

  const fontSizeFormik = useFormik({
    initialValues: fontSize,
    onSubmit: (values) =>
      saveChangedValues(values, fontSize, url, setResume, ["meta", "fontSize"]),
  });
  useFormikAutoSave(fontSizeFormik, 0);

  const restFormik = useFormik({
    initialValues: rest,
    onSubmit: (values) =>
      saveChangedValues(values, rest, url, setResume, ["meta"]),
  });
  useFormikAutoSave(restFormik, 0);

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
        <RadioGroup
          displayName={"Page layout"}
          {...getFieldPropsMetaHelpers(paperFormik, "layout")}
          options={[
            { ownValue: "full", children: <Full /> },
            { ownValue: "split", children: <Split /> },
          ]}
        />
        <Range
          displayName={"Elements spacing"}
          min={40}
          max={60}
          step={5}
          {...getFieldPropsMeta(paperFormik, "space")}
        />
        <hr />
        <FontRadioGroup
          displayName={"font"}
          {...getFieldPropsMetaHelpers(restFormik, "fontFamily")}
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
          {...getFieldPropsMetaHelpers(colorsFormik, "secondary")}
        />
        <CustomFontSizes>
          {displayFontRange(
            <Range
              displayName={"contents size"}
              min={10}
              max={12}
              step={1}
              {...getFieldPropsMeta(fontSizeFormik, "small")}
            />
          )}
          {displayFontRange(
            <Range
              displayName={"name size"}
              min={34}
              max={42}
              step={1}
              {...getFieldPropsMeta(fontSizeFormik, "big")}
            />
          )}
          {displayFontRange(
            <Range
              displayName={"Titles size"}
              min={20}
              max={24}
              step={1}
              {...getFieldPropsMeta(fontSizeFormik, "large")}
            />
          )}
          {displayFontRange(
            <Range
              displayName={"Titles size"}
              min={15}
              max={17}
              step={1}
              {...getFieldPropsMeta(fontSizeFormik, "medium")}
            />
          )}
        </CustomFontSizes>
        <hr />
        <ColorPicker
          displayName={"Accents color"}
          {...getFieldPropsMetaHelpers(colorsFormik, "main")}
        />
        <RadioGroup
          displayName={"Page background"}
          {...getFieldPropsMetaHelpers(restFormik, "background")}
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
            { ownValue: "Waves", children: <Image src={WavesBackground} /> },
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
      </Form>
    </Section>
  );
});

export default Meta;
