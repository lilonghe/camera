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
  thumbnail?: string;

  parameter?: {
    // 机械快门
    hasMShutter?: boolean;
    // 防抖
    ois?: boolean;
  };
}
