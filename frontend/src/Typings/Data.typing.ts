type DataShape = {
  value: string;
  type: "phone" | "link" | "email" | "location" | "date";
  style?: Object;
};

export interface DataViewer extends DataShape {}

export default DataShape;
