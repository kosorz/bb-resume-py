import React, { ReactElement } from "react";
import styled from "styled-components";

import Experience from "../Experience";
import Skills from "../Skills";
import { Title } from "../../Editor";
import { observer } from "mobx-react-lite";
import { SortableList } from "./SortableList";
import MetaShape from "../../../../typings/Meta.typing";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const getTitle = (order: string) => {
  switch (order) {
    case "leftOrder":
      return "Left Column";
    case "rightOrder":
      return "Right Column";
    case "order":
      return "Content";
    default:
      return "Unlisted";
  }
};

const sections: { [key: string]: ReactElement | undefined } = {
  experience: <Experience />,
  skills: <Skills />,
};

const Column = observer(
  ({
    order,
    meta,
  }: {
    order: "order" | "leftOrder" | "rightOrder" | "unlisted";
    meta: MetaShape;
  }) => {
    const { content, paper } = meta;
    const { layout } = paper;
    const { full, split } = content;

    let orderArray;

    if (order === "order") {
      orderArray = full[order];
    } else if (order === "leftOrder" || order === "rightOrder") {
      orderArray = split[order];
    } else {
      orderArray = layout === "full" ? full[order] : split[order];
    }

    const items = orderArray.map((s: string) => {
      return { key: s, value: sections[s] };
    });

    const title = getTitle(order);
    return items.length > 0 ? (
      <>
        <Title>{title}</Title>
        <Wrapper>
          <SortableList
            order={order}
            layout={layout}
            items={items}
            lockToContainerEdges={true}
            lockAxis={"y"}
            lockOffset={"0%"}
            pressDelay={100}
            useDragHandle={true}
          />
        </Wrapper>
      </>
    ) : null;
  }
);

export default Column;
