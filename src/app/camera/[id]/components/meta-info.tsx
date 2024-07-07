import { FrameColor, FrameMap } from "@/db/format";
import { ICameraListItem } from "@/db/interface";
import { Badge, BadgeProps, Tooltip } from "@radix-ui/themes";
import VisitCount from "./visit-count";

export default function MetaInfo(res: ICameraListItem) {
  return (
    <div className="flex gap-1 mt-1">
      <Tooltip
        content={res.imageSensorSize?.map((res) => res + "mm").join(" x ")}
      >
        <Badge
          color={FrameColor[res.frame] as BadgeProps["color"]}
          className={res.imageSensorSize && "cursor-pointer"}
        >
          {FrameMap[res.frame]}
        </Badge>
      </Tooltip>

      <Tooltip content={res.imageSensor}>
        <Badge color="gray" className="cursor-pointer">
          {res.effectivePixels}W
        </Badge>
      </Tooltip>
      <Badge>{res.weight}g</Badge>

      <VisitCount cameraId={res.id} />
    </div>
  );
}
