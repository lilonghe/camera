import CameraMoreInfo from "@/components/camera-more-info";
import { FrameColor, FrameMap } from "@/db/format";
import { ICameraListItem } from "@/db/interface";
import { Badge, BadgeProps, Tooltip } from "@radix-ui/themes";

export default function Parameter({ item }: { item: ICameraListItem }) {
  return (
    <div className="flex gap-1 mt-1 items-center">
      <Tooltip
        content={item.imageSensorSize?.map((item) => item + "mm").join(" x ")}
      >
        <Badge
          color={FrameColor[item.frame] as BadgeProps["color"]}
          className={item.imageSensorSize && "cursor-pointer"}
        >
          {FrameMap[item.frame]}
        </Badge>
      </Tooltip>

      <Tooltip content={item.imageSensor}>
        <Badge color="gray" className="cursor-pointer">
          {item.effectivePixels}W
        </Badge>
      </Tooltip>
      <Badge>{item.weight}g</Badge>

      <CameraMoreInfo data={item} className="ml-auto text-gray-300" />
    </div>
  );
}
