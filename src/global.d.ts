declare module "exifr/dist/full.esm.mjs" {
  function parse(
    file: File,
    options?: {
      mimeType?: string;
      exif?: boolean;
      icc?: boolean;
      xmp?: boolean;
      iptc?: boolean;
      comment?: boolean;
    }
  ): Promise<IExifData>;
}

interface IExifData {
  Make: string;
  Model: string;
  Orientation: string;
  XResolution: number;
  YResolution: number;
  ResolutionUnit: string;
  Software: string;
  ModifyDate: string;
  YCbCrPositioning: number;
  ExposureTime: number;
  FNumber: number;
  ExposureProgram: string;
  ISO: number;
  SensitivityType: number;
  RecommendedExposureIndex: number;
  ExifVersion: string;
  DateTimeOriginal: string;
  CreateDate: string;
  OffsetTime: string;
  OffsetTimeOriginal: string;
  OffsetTimeDigitized: string;
  CompressedBitsPerPixel: number;
  ExposureCompensation: number;
  MeteringMode: string;
  LightSource: string;
  Flash: string;
  FocalLength: number;
  SubSecTime: string;
  SubSecTimeOriginal: string;
  SubSecTimeDigitized: string;
  FlashpixVersion: string;
  ColorSpace: number;
  ExifImageWidth: number;
  ExifImageHeight: number;
  SensingMethod: string;
  FileSource: string;
  SceneType: string;
  CustomRendered: string;
  ExposureMode: string;
  WhiteBalance: string;
  FocalLengthIn35mmFormat: number;
  SceneCaptureType: string;
  GainControl: string;
  Contrast: string;
  Saturation: string;
  Sharpness: string;
  SubjectDistanceRange: string;
  SerialNumber: string;
  LensInfo: Array<number>;
  LensMake: string;
  LensModel: string;
  LensSerialNumber: string;

  ImageNumber: number;
  Lens: string;

  longitude?: number;
  latitude?: number;
}
