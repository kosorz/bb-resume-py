import React, { ReactElement, useContext, useState } from "react";
import styled from "styled-components";
import move from "array-move";
import { observer } from "mobx-react-lite";

import Experience from "../Experience";
import Skills from "../Skills";
import { Title } from "../../Editor";
import { SortableList } from "./SortableList";
import { wobbleOne, wobbleTwo } from "./Wooble";

import { ResumeBubble } from "../../../../bubbles/ResumeBubble";
import axios from "../../../../util/axios";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  > section > section:nth-child(2n) > section,
  > section > section:nth-child(2n) > article {
    animation-name: ${({ wobble }: { wobble: boolean }) =>
      wobble ? wobbleOne : ""};
    animation-iteration-count: infinite;
    transform-origin: 50% 10%;
    animation-duration: 0.5s;
  }

  > section > section:nth-child(2n + 1) > section,
  > section > section:nth-child(2n + 1) > article {
    animation-name: ${({ wobble }: { wobble: boolean }) =>
      wobble ? wobbleTwo : ""};
    animation-iteration-count: infinite;
    transform-origin: 30% 5%;
    animation-duration: 0.5s;
  }
`;

const sections: { [key: string]: ReactElement | undefined } = {
  experience: <Experience />,
  skills: <Skills />,
};

const Column = observer(
  ({
    order,
  }: {
    order: "order" | "mainOrder" | "secondaryOrder" | "unlisted";
  }) => {
    const resumeBubble = useContext(ResumeBubble);
    const { resume, updateContentOrder } = resumeBubble;
    const { id, meta } = resume;
    const { content, paper, template } = meta!;
    const { layout } = paper;
    const { full, split } = content;
    const [wobble, setWobble] = useState(false);
    const splitListedColumnsSwapped = resume.meta?.template === "calm";

    let orderArray: string[];

    if (order === "order") {
      orderArray = full[order];
    } else if (order === "mainOrder" || order === "secondaryOrder") {
      orderArray = split[order];
    } else {
      orderArray =
        layout === "full" && template === "classic"
          ? full[order]
          : split[order];
    }

    const items = orderArray.map((s: string) => {
      return { key: s, value: sections[s] };
    });

    const onSortEnd = ({
      oldIndex,
      newIndex,
    }: {
      oldIndex: number;
      newIndex: number;
    }) => {
      setWobble(false);
      const newOrder = move(orderArray, oldIndex, newIndex);
      if (newOrder.toString() !== order.toString()) {
        updateContentOrder(
          template === "calm" ? "split" : layout,
          order,
          newOrder
        );
        axios
          .post(`/resumes/${id}/column/${order}/reorganize`, newOrder)
          .catch(() => {
            updateContentOrder(layout, order, orderArray);
          });
      }
    };

    const onSortStart = () => setWobble(true);

    const getTitle = (order: string) => {
      switch (order) {
        case "mainOrder":
          return splitListedColumnsSwapped ? "Right Column" : "Left Column";
        case "secondaryOrder":
          return splitListedColumnsSwapped ? "Left Column" : "Right Column";
        case "order":
          return "Content";
        default:
          return "Unlisted";
      }
    };

    return items.length > 0 ? (
      <>
        <Title>{getTitle(order)}</Title>
        <Wrapper wobble={wobble}>
          <SortableList
            order={order}
            layout={layout}
            onSortEnd={onSortEnd}
            onSortStart={onSortStart}
            items={items}
            lockToContainerEdges={true}
            lockAxis={"y"}
            lockOffset={"48px"}
            useDragHandle={true}
            pressDelay={0}
          />
        </Wrapper>
      </>
    ) : null;
  }
);

export default Column;
