import { FrameEnum } from "./format";

export interface ICameraListItem {
  id: string;
  model: string;
  brand: string;
  weight: number;
  effectivePixels: number;
  frame: FrameEnum;
  publishDate: Date;
}
