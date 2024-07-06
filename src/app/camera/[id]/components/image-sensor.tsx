import { ICameraListItem } from "@/db/interface";
import { AspectRatio, Tooltip } from "@radix-ui/themes";

export default function ImageSensor({
  imageSensorSize = [],
}: {
  imageSensorSize: ICameraListItem["imageSensorSize"];
}) {
  return (
    <div
      style={{
        width: imageSensorSize[0] + "mm",
      }}
    >
      <Tooltip
        content={`${imageSensorSize[0] + "mm x " + imageSensorSize[1]}mm`}
      >
        <AspectRatio
          ratio={imageSensorSize[0] / imageSensorSize[1]}
          className="rounded bg-gray-500 opacity-50"
        />
      </Tooltip>
    </div>
  );
}
