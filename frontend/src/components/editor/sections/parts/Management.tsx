import React from "react";
import DangerButton from "../../../page/DangerButton";
import WarningButton from "../../../page/WarningButton";
import Button from "../../../page/Button";
import axios from "../../../../util/axios";

const Management = ({
  column,
  urlBase,
  updateFn,
}: {
  column: string;
  urlBase: string;
  updateFn: Function;
}) => {
  const list = (order: string) => {
    axios.post(`${urlBase}/list/${order}`).then((res) => {
      updateFn(res.data);
    });
  };

  const migrate = () => {
    axios.post(`${urlBase}/migrate`).then((res) => {
      updateFn(res.data);
    });
  };

  const unlist = () => {
    axios.post(`${urlBase}/unlist`).then((res) => {
      updateFn(res.data);
    });
  };

  const renderDeleteButton = () => (
    <DangerButton onClick={() => {}}>Delete</DangerButton>
  );
  const renderUnlistButton = () => (
    <WarningButton onClick={() => unlist()}>Unlist</WarningButton>
  );

  if (column === "splitListedLeft" || column === "splitListedRight") {
    return (
      <>
        <Button onClick={() => migrate()}>
          List&nbsp;in&nbsp;Column&nbsp;
          {column === "splitListedLeft" ? "II" : "I"}
        </Button>
        {renderUnlistButton()}
      </>
    );
  }

  if (column === "splitUnlisted") {
    return (
      <>
        <Button onClick={() => list("leftOrder")}>
          List&nbsp;in&nbsp;Column&nbsp;I
        </Button>
        <Button onClick={() => list("rightOrder")}>
          List&nbsp;in&nbsp;Column&nbsp;II
        </Button>
        {renderDeleteButton()}
      </>
    );
  }

  if (column === "fullListed") return renderUnlistButton();

  if (column === "fullUnlisted") {
    return (
      <>
        <Button onClick={() => list("order")}>List&nbsp;in&nbsp;Resume</Button>
        {renderDeleteButton()}
      </>
    );
  }

  return null;
};

export default Management;
