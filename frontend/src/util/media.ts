import { css, FlattenSimpleInterpolation } from "styled-components";

type SizesShape = { [key: string]: number };

type CombinedQueriesShape = {
  [key: string]: (...args: any[]) => FlattenSimpleInterpolation;
};

export const sizes: SizesShape = {
  tablet: 992,
  phone: 576,
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
