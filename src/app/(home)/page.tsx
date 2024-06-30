import db from "@/db";
import { FrameColor, FrameMap } from "@/db/format";
import { ICameraListItem } from "@/db/interface";
import { Badge, BadgeProps, Box, Card, Text } from "@radix-ui/themes";

export default async function Home() {
  async function getCameras() {
    "use server";
    const result = await db.query(
      "select id, brand, model, publishDate, weight, effectivePixels, frame from camera order by publishDate desc,createdAt desc limit 30"
    );
    return result[0] as ICameraListItem[];
  }

  const res = await getCameras();
  return (
    <main className="page content">
      <section className="flex flex-wrap justify-between gap-y-5 gap-x-3">
        {res.map((item) => (
          <Card key={item.id} className="w-[220px] flex-grow" variant="surface">
            <div>
              <Text>{item.model}</Text>
              <p className="text-xs text-gray-300">
                {item.publishDate?.toLocaleDateString()}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-gray-400 text-sm">{item.brand}</p>
              <div className="flex gap-1 mt-1">
                <Badge color={FrameColor[item.frame] as BadgeProps["color"]}>
                  {FrameMap[item.frame]}
                </Badge>
                <Badge color="gray">{item.effectivePixels}W</Badge>
                <Badge>{item.weight}g</Badge>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
