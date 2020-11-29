import React, { useContext } from "react";
import styled from "styled-components";

import Trash from "../../../page/Trash";
import Right from "../../../page/Right";
import Left from "../../../page/Left";
import Hide from "../../../page/Hide";
import Show from "../../../page/Show";

import axios from "../../../../util/axios";
import { ResumeBubble } from "../../../../bubbles/ResumeBubble";

const AddRight = styled(Right)`
  &:hover {
    fill: ${({ theme }) => theme.green};
    background: ${({ theme }) => theme.lightGreen};
  }
`;

const AddLeft = styled(Left)`
  &:hover {
    fill: ${({ theme }) => theme.green};
    background: ${({ theme }) => theme.lightGreen};
  }
`;

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

  const trash = <Trash onClick={() => deleteSection()} />;
  const hide = <Hide onClick={() => unlist()} />;

  if (column === "splitListedLeft" || column === "splitListedRight") {
    return (
      <>
        {column === "splitListedLeft" ? (
          <Right onClick={() => migrate()} />
        ) : (
          <Left onClick={() => migrate()} />
        )}
        {hide}
      </>
    );
  }

  if (column === "splitUnlisted") {
    return (
      <>
        <AddLeft onClick={() => list("leftOrder")} />
        <AddRight onClick={() => list("rightOrder")} />
        {deletable && trash}
      </>
    );
  }

  if (column === "fullListed") return hide;

  if (column === "fullUnlisted") {
    return (
      <>
        <Show onClick={() => list("order")} />
        {deletable && trash}
      </>
    );
  }

  return null;
};

export default Management;
