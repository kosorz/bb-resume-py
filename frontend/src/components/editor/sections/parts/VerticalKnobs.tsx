import React, { SyntheticEvent } from "react";

import Up from "../../../page/Up";
import Down from "../../../page/Down";

const VerticalKnobs = ({
  renderUp = true,
  renderDown = true,
  onUp = () => {},
  onDown = () => {},
}: {
  className?: string;
  renderUp?: boolean;
  renderDown?: boolean;
  onUp?: (event: SyntheticEvent<Element, Event>) => void;
  onDown?: (event: SyntheticEvent<Element, Event>) => void;
}) => (
  <>
    {renderUp && <Up onClick={onUp} />}
    {renderDown && <Down onClick={onDown} />}
  </>
);

export default VerticalKnobs;
