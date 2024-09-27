import { getExifKeyLabel } from "@/config/exif";
import { Badge, DataList, ScrollArea } from "@radix-ui/themes";
import { useState } from "react";

const showKeys = [
  "CreateDate",
  "ExposureCompensation",
  "FocalLength",
  "ExifImageWidth",
  "ExifImageHeight",
  "ImageNumber",
];

export default function ExifDetail({ data }: { data: IExifData }) {
  const [showAll, setShowAll] = useState(false);

  const formatValue = (value: any) => {
    if (value instanceof Date) {
      return value.toLocaleString();
    }
    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return value;
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  console.log(data);

  return (
    <div className="w-full">
      <div className="mb-5 flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          <Badge color="blue">相机型号：{data.Model}</Badge>
          {data.SerialNumber && (
            <Badge color="blue">相机序列号：{data.SerialNumber}</Badge>
          )}
          <span className="text-sm text-gray-400">by {data.Make}</span>
        </div>

        {/* Lens info */}
        {data.LensModel && (
          <div className="flex gap-2 flex-wrap">
            <Badge color="blue">镜头型号：{data.LensModel}</Badge>
            {data.LensSerialNumber && (
              <Badge color="blue">镜头序列号：{data.LensSerialNumber}</Badge>
            )}
            {data.LensMake && (
              <span className="text-sm text-gray-400">by {data.LensMake}</span>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Badge>
            快门：{`1/${(1000 / data.ExposureTime / 1000).toFixed()}s`}
          </Badge>
          <Badge>光圈：F{data.FNumber.toFixed(1)}</Badge>
          <Badge>ISO：{data.ISO}</Badge>
          <Badge>白平衡：{data.WhiteBalance}</Badge>
          {data.ExposureCompensation > 0 && (
            <Badge>曝光补偿：{data.ExposureCompensation}</Badge>
          )}
        </div>

        {/* 其他信息 */}
        <div className="flex gap-2 flex-wrap">
          <Badge>
            焦距：{data.FocalLength.toFixed(0)}mm
            <span className="text-xs text-gray-400">
              {data.FocalLengthIn35mmFormat &&
                data.FocalLengthIn35mmFormat !== data.FocalLength &&
                `(等效焦距：${data.FocalLengthIn35mmFormat}mm)`}
            </span>
          </Badge>
          {data.ExifImageWidth && (
            <Badge>
              照片尺寸：{data.ExifImageWidth}x{data.ExifImageHeight}
              <span className="text-xs text-gray-400">
                (像素：
                {Math.floor(
                  (data.ExifImageWidth * data.ExifImageHeight) / 10000
                )}
                W )
              </span>
            </Badge>
          )}
          {data.CreateDate && (
            <Badge>
              拍摄时间：
              {(data.CreateDate as unknown as Date).toLocaleDateString("zh-cn")}
              &nbsp;
              {(data.CreateDate as unknown as Date).toLocaleTimeString("zh-cn")}
            </Badge>
          )}
        </div>

        {!showAll && (
          <a
            className="text-sm text-blue-400 cursor-pointer"
            onClick={handleShowAll}
          >
            显示所有信息
          </a>
        )}
      </div>
      {showAll && (
        <ScrollArea scrollbars="vertical" style={{ maxHeight: 400 }}>
          <DataList.Root>
            {Object.entries(data).map(([key, value]) =>
              showAll || showKeys.includes(key) ? (
                <DataList.Item key={key} align="center">
                  <DataList.Label minWidth="88px">
                    {getExifKeyLabel(key)}
                  </DataList.Label>
                  <DataList.Value>{formatValue(value)}</DataList.Value>
                </DataList.Item>
              ) : null
            )}
          </DataList.Root>
        </ScrollArea>
      )}
    </div>
  );
}
