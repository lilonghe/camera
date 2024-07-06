import { getCameras } from "@/actions";
import { FrameColor, FrameMap } from "@/db/format";
import { IPageProps } from "@/types/interface";
import { Badge, BadgeProps, Card, Tooltip } from "@radix-ui/themes";
import Link from "next/link";

export default async function Home({ searchParams }: IPageProps) {
  const res = await getCameras();
  const compareFromId = searchParams["id"];

  return (
    <main className="page content">
      <section className="flex flex-wrap justify-between gap-y-5 gap-x-3">
        {res.map((item) => (
          <Link
            key={item.id}
            href={
              compareFromId
                ? `/camera/${compareFromId}?targetId=${item.id}`
                : `/camera/${item.id}`
            }
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
