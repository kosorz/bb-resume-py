import React, { useContext } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";

import Trash from "../../../page/Trash";
import Right from "../../../page/Right";
import Left from "../../../page/Left";
import Hide from "../../../page/Hide";
import Show from "../../../page/Show";

import axios from "../../../../util/axios";
import { ResumeBubble } from "../../../../bubbles/ResumeBubble";

const AddToSecondary = styled(Right)`
  &:hover {
    fill: ${({ theme }) => theme.green};
    background: ${({ theme }) => theme.lightGreen};
  }
`;

const AddToMain = styled(Left)`
  &:hover {
    fill: ${({ theme }) => theme.green};
    background: ${({ theme }) => theme.lightGreen};
  }
`;

const Management = ({
  column,
  urlBase,
  identifier,
  deletable,
}: {
  column: string;
  urlBase: string;
  identifier: "skills" | "experience" | "meta" | "info" | "gallery" | "";
  deletable: boolean;
}) => {
  const resumeBubble = useContext(ResumeBubble);
  const { updateContent, deleteSectionUpdate, resume } = resumeBubble;
  const splitListedColumnsSwapped = resume.meta?.template === "calm";

  const list = useMutation(
    (order: "mainOrder" | "secondaryOrder" | "order") =>
      axios.post(`${urlBase}/list/${order}`),
    {
      onSuccess: (res) => {
        updateContent(res.data);
      },
    }
  );

  const migrate = useMutation(() => axios.post(`${urlBase}/migrate`), {
    onSuccess: (res) => {
      updateContent(res.data);
    },
  });

  const unlist = useMutation(() => axios.post(`${urlBase}/unlist`), {
    onSuccess: (res) => {
      updateContent(res.data);
    },
  });

  const deleteSection = useMutation(() => axios.delete(`${urlBase}`), {
    onSuccess: (res) => {
      deleteSectionUpdate(res.data, identifier);
    },
  });

  const trash = <Trash onClick={() => deleteSection.mutate()} />;
  const hide = <Hide onClick={() => unlist.mutate()} />;

  const left = <Left onClick={() => migrate.mutate()} />;
  const right = <Right onClick={() => migrate.mutate()} />;

  if (column === "splitListedLeft" || column === "splitListedRight") {
    return (
      <>
        {column === "splitListedLeft"
          ? splitListedColumnsSwapped
            ? left
            : right
          : splitListedColumnsSwapped
          ? right
          : left}
        {hide}
      </>
    );
  }

  if (column === "splitUnlisted") {
    return (
      <>
        <AddToMain onClick={() => list.mutate("mainOrder")} />
        <AddToSecondary onClick={() => list.mutate("secondaryOrder")} />
        {deletable && trash}
      </>
    );
  }

  if (column === "fullListed") return hide;

  if (column === "fullUnlisted") {
    return (
      <>
        <Show onClick={() => list.mutate("order")} />
        {deletable && trash}
      </>
    );
  }

  return null;
};

export default Management;
