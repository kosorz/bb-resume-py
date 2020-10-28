import { FlattenSimpleInterpolation } from "styled-components";

export type SizesShape = { [key: string]: number };
export type QueriesShape = { [key: string]: string };

type CombinedQueriesShape = {
  [key: string]: (...args: any[]) => FlattenSimpleInterpolation;
};

export default CombinedQueriesShape;
