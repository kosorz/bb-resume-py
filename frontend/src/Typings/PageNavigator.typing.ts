import { MouseEvent } from "react";

interface PageNavigator {
  currentPage: number;
  numPages: number;
  onPreviousPage: (event: MouseEvent) => void;
  onNextPage: (event: MouseEvent) => void;
}

export default PageNavigator;
