import { getCameras } from "@/actions";
import LazyImg from "@/components/lazy-img";
import { FrameColor, FrameMap } from "@/db/format";
import { IPageProps } from "@/types/interface";
import { Badge, BadgeProps, Card, Tooltip } from "@radix-ui/themes";
import Link from "next/link";
import Filter from "./components/filter";

export default async function Home({ searchParams }: IPageProps) {
  const res = await getCameras({ keyword: searchParams["keyword"] });
  const compareFromId = searchParams["id"];

  return (
    <main className="page content">
      <Filter params={searchParams} />
      <section className="flex flex-wrap justify-between gap-3 mt-3">
        {res.map((item) => (
          <Link
            key={item.id}
            prefetch={false}
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

              {item.thumbnail && (
                <LazyImg
                  loading="lazy"
                  alt="thumbnail"
                  src={(process.env.CDN_HOST || "") + item.thumbnail}
                  className="absolute top-2.5 right-2.5"
                  width={50}
                />
              )}
            </Card>
          </Link>
        ))}
        {res.length <= 0 && (
          <div className="leading-[100px] text-center text-gray-400 text-sm">
            未搜索到相关结果
          </div>
        )}
      </section>
    </main>
  );
}
