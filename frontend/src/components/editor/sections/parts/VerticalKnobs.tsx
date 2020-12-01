import React, { SyntheticEvent } from "react";
import { SortableHandle } from "react-sortable-hoc";

import Up from "../../../page/Up";
import Move from "../../../page/Move";
import Down from "../../../page/Down";

const Handle = SortableHandle(() => {
  return <Move />;
});

const Knobs = ({
  renderUp = true,
  renderDown = true,
  renderHandle = false,
  onUp = () => {},
  onDown = () => {},
}: {
  className?: string;
  renderUp?: boolean;
  renderDown?: boolean;
  renderHandle?: boolean;
  onUp?: (event: SyntheticEvent<Element, Event>) => void;
  onDown?: (event: SyntheticEvent<Element, Event>) => void;
}) => (
  <>
    {renderHandle && <Handle />}
    {renderUp && <Up onClick={onUp} />}
    {renderDown && <Down onClick={onDown} />}
  </>
);

export default Knobs;
