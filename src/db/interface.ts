import { FrameEnum } from "./format";

export interface ICameraListItem {
  id: string;
  model: string;
  alias?: string;
  brand: string;
  weight: number;
  effectivePixels: number;
  frame: FrameEnum;
  publishDate: Date;
  imageSensor: string;
  imageSensorSize?: number[];
  dimensionsList: number[];
  keyword: string;
}
