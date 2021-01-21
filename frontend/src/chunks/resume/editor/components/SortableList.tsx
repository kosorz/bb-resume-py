import React, { ReactNode } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

//@ts-ignore
const SortableItem = SortableElement((props) => props.elem);

export const SortableList = SortableContainer(
  ({
    items,
    order,
    layout,
  }: {
    items: { key: string; value: ReactNode }[];
    order: string;
    layout?: string;
  }) => {
    return (
      <section>
        {items.map((it, i) => {
          if (!it.value) {
            return null;
          }

          return (
            <SortableItem
              key={`item-${i}-${order}-${layout}-${it.key}`}
              elem={it.value}
              index={i}
            />
          );
        })}
      </section>
    );
  }
);
