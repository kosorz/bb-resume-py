import { css } from "styled-components";

import CombinedQueriesShape, {
  SizesShape,
  QueriesShape,
} from "../typings/Media.typing";

const sizes: SizesShape = {
  tablet: 992,
  phone: 576,
};

export const queries: QueriesShape = {
  tablet: `(max-width: ${sizes.tablet}px)`,
  phone: `(max-width: ${sizes.phone}px)`,
};

const media = Object.keys(sizes).reduce(
  (acc: CombinedQueriesShape, label: string) => {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css(args[0], ...args.slice(1))}
      }
    `;

    return acc;
  },
  {}
);

export default media;
