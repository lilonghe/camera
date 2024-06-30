import db from "@/db";
import { FrameColor, FrameMap } from "@/db/format";
import { ICameraListItem } from "@/db/interface";
import { AspectRatio, BadgeProps, Tooltip, Badge } from "@radix-ui/themes";

interface IParams {
  id: string;
}

export default async function CameraDetail({ params }: { params: IParams }) {
  async function getCameras({ id }: IParams) {
    "use server";
    const result = await db.query(
      "select id, brand, model, alias, publishDate, weight, effectivePixels, frame, imageSensor, imageSensorSize, dimensionsList from camera where id = ?",
      [id]
    );
    return (result[0] as ICameraListItem[])[0];
  }

  const res = await getCameras({ id: params.id });

  const scaleFactor = 3;

  return (
    <div className="page content">
      <h2 className="text-3xl font-medium">
        {res.brand} {res.alias || res.model}
      </h2>
      <p className="text-gray-400 text-sm">
        {res.publishDate?.toLocaleDateString()}
      </p>
      <div className="mt-2">
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
        </div>
      </div>
      {res.imageSensorSize && (
        <div className="mt-2">
          <div
            style={{
              width: res.imageSensorSize[0] * scaleFactor,
            }}
          >
            <AspectRatio
              ratio={res.imageSensorSize[0] / res.imageSensorSize[1]}
              className="rounded bg-gray-500 opacity-50"
            />
          </div>
        </div>
      )}

      {res.dimensionsList && (
        <div className="flex gap-2 select-none text-sm">
          <div
            className="mt-2"
            style={{
              width: res.dimensionsList[0] * scaleFactor,
            }}
          >
            <AspectRatio
              ratio={res.dimensionsList[0] / res.dimensionsList[1]}
              className="border border-dashed border-gray-400 text-gray-400 rounded flex items-center justify-center"
            >
              {res.dimensionsList[0]}mm x {res.dimensionsList[1]}mm
            </AspectRatio>
          </div>
          <div
            className="mt-2"
            style={{
              width: res.dimensionsList[2] * 3,
            }}
          >
            <AspectRatio
              ratio={res.dimensionsList[2] / res.dimensionsList[1]}
              className="border border-dashed border-gray-400 text-gray-400 rounded flex items-center justify-center"
            >
              {res.dimensionsList[2]}mm x {res.dimensionsList[1]}mm
            </AspectRatio>
          </div>
        </div>
      )}
    </div>
  );
}
