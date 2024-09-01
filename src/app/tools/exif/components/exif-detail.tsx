import { getExifKeyLabel } from "@/config/exif";
import { Badge, DataList, ScrollArea } from "@radix-ui/themes";
import { useState } from "react";

const showKeys = [
  "CreateDate",
  "ExposureCompensation",
  "FocalLength",
  "ExifImageWidth",
  "ExifImageHeight",
  "Make",
  "Model",
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

  return (
    <div className="w-full">
      <div className="mb-5 flex flex-col gap-2">
        <div className="flex gap-2">
          <Badge color="orange">相机型号：{data.Model}</Badge>
          <Badge color="orange">相机序列号：{data.SerialNumber}</Badge>
          <span className="text-sm text-gray-500">by {data.Make}</span>
        </div>
        <div className="flex gap-2">
          <Badge color="blue">镜头型号：{data.LensModel}</Badge>
          <Badge color="blue">镜头序列号：{data.LensSerialNumber}</Badge>
          <span className="text-sm text-gray-500">by {data.LensMake}</span>
        </div>
        <div className="flex gap-2">
          <Badge>
            快门：{`1/${(1000 / data.ExposureTime / 1000).toFixed()}`}
          </Badge>
          <Badge>光圈：F{data.FNumber}</Badge>
          <Badge>ISO：{data.ISO}</Badge>
          <Badge>白平衡：{data.WhiteBalance}</Badge>
        </div>
      </div>
      <ScrollArea scrollbars="vertical" style={{ height: 400 }}>
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
          {!showAll && (
            <a
              className="text-sm text-blue-400 cursor-pointer"
              onClick={handleShowAll}
            >
              显示所有
            </a>
          )}
        </DataList.Root>
      </ScrollArea>
    </div>
  );
}
