import { getCameras } from "@/actions";
import CameraCard from "@/components/camera-card";
import { IPageProps } from "@/types/interface";
import Filter from "./components/filter";

export default async function Home({ searchParams }: IPageProps) {
  const timeRange = searchParams["timeRange"]
    ? parseInt(searchParams["timeRange"])
    : undefined;

  const res = await getCameras({
    keyword: searchParams["keyword"],
    sortBy: searchParams["sortBy"],
    timeRange,
    brand: searchParams["brand"],
  });
  const compareFromId = searchParams["id"];

  return (
    <main className="page content">
      <Filter params={searchParams} />
      <section className="flex flex-wrap justify-between gap-3 mt-3">
        {res.map((item) => (
          <CameraCard key={item.id} data={item} />
        ))}
        {res.length <= 0 && (
          <div className="leading-[100px] text-center text-gray-400 text-sm min-h-[60vh]">
            未搜索到相关结果
          </div>
        )}
      </section>
    </main>
  );
}
