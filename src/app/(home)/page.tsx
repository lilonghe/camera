import db from "@/db";
import { FrameColor, FrameMap } from "@/db/format";
import { ICameraListItem } from "@/db/interface";
import { Badge, BadgeProps, Box, Card, Text, Tooltip } from "@radix-ui/themes";
import Link from "next/link";

export default async function Home() {
  async function getCameras() {
    "use server";
    const result = await db.query(
      "select id, brand, model, alias, publishDate, weight, effectivePixels, frame, imageSensor, imageSensorSize from camera order by publishDate desc,createdAt desc limit 30"
    );
    return result[0] as ICameraListItem[];
  }

  const res = await getCameras();
  return (
    <main className="page content">
      <section className="flex flex-wrap justify-between gap-y-5 gap-x-3">
        {res.map((item) => (
          <Link
            key={item.id}
            href={"/camera/" + item.id}
            className="w-[220px] flex-grow"
          >
            <Card variant="surface">
              <div>
                <Tooltip content={item.model}>
                  <p className="inline-flex">{item.alias || item.model}</p>
                </Tooltip>
                <p className="text-xs text-gray-300">
                  {item.publishDate?.toLocaleDateString()}
                </p>
              </div>

              <div className="mt-2">
                <p className="text-gray-400 text-sm">{item.brand}</p>
                <div className="flex gap-1 mt-1">
                  <Tooltip
                    content={item.imageSensorSize
                      ?.map((item) => item + "mm")
                      .join(" x ")}
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
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
}
