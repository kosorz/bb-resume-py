import React, { useContext } from "react";

import DangerButton from "../../../page/DangerButton";
import WarningButton from "../../../page/WarningButton";
import Button from "../../../page/Button";
import axios from "../../../../util/axios";
import { ResumeBubble } from "../../../../bubbles/ResumeBubble";

const Management = ({
  title,
  column,
  urlBase,
  identifier,
  deletable,
}: {
  title: string;
  column: string;
  urlBase: string;
  identifier: "skills" | "experience" | "meta" | "info" | "gallery" | "";
  deletable: boolean;
}) => {
  const resumeBubble = useContext(ResumeBubble);
  const { updateContent, deleteSectionUpdate } = resumeBubble;

  const list = (order: string) => {
    axios.post(`${urlBase}/list/${order}`).then((res) => {
      updateContent(res.data);
    });
  };

  const migrate = () => {
    axios.post(`${urlBase}/migrate`).then((res) => {
      updateContent(res.data);
    });
  };

  const unlist = () => {
    axios.post(`${urlBase}/unlist`).then((res) => {
      updateContent(res.data);
    });
  };

  const deleteSection = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${title}? This operation is irreversible.`
      )
    ) {
      axios.delete(`${urlBase}`).then((res) => {
        deleteSectionUpdate(res.data, identifier);
      });
    }
  };

  const renderDeleteButton = () => (
    <DangerButton onClick={() => deleteSection()}>Delete</DangerButton>
  );
  const renderUnlistButton = () => (
    <WarningButton onClick={() => unlist()}>Unlist</WarningButton>
  );

  if (column === "splitListedLeft" || column === "splitListedRight") {
    return (
      <>
        <Button onClick={() => migrate()}>
          List&nbsp;in&nbsp;
          {column === "splitListedLeft" ? "right" : "left"}
          &nbsp;column
        </Button>
        {renderUnlistButton()}
      </>
    );
  }

  if (column === "splitUnlisted") {
    return (
      <>
        <Button onClick={() => list("leftOrder")}>
          List&nbsp;in&nbsp;left&nbsp;column
        </Button>
        <Button onClick={() => list("rightOrder")}>
          List&nbsp;in&nbsp;right&nbsp;column
        </Button>
        {deletable && renderDeleteButton()}
      </>
    );
  }

  if (column === "fullListed") return renderUnlistButton();

  if (column === "fullUnlisted") {
    return (
      <>
        <Button onClick={() => list("order")}>List&nbsp;in&nbsp;Resume</Button>
        {deletable && renderDeleteButton()}
      </>
    );
  }

  return null;
};

export default Management;
