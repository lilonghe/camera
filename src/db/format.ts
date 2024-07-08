export enum FrameEnum {
  half = "half",
  full = "full",
  medium = "medium",
  large = "large",
  M43 = "M43",
}

export const FrameMap: Record<FrameEnum, string> = {
  [FrameEnum.half]: "APS-C",
  [FrameEnum.full]: "全画幅",
  [FrameEnum.medium]: "中画幅",
  [FrameEnum.large]: "大画幅",
  [FrameEnum.M43]: "M43",
};

export const FrameColor: Record<FrameEnum, string> = {
  [FrameEnum.half]: "amber",
  [FrameEnum.full]: "blue",
  [FrameEnum.medium]: "green",
  [FrameEnum.large]: "orange",
  [FrameEnum.M43]: "mint",
};
