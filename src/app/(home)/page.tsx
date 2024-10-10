import { getCameras, getCamerasByModels } from "@/actions";
import CameraCard from "@/components/camera-card";

export default async function Home() {
  const [res, flagshipRes, latestRes] = await Promise.all([
    getCamerasByModels(["Z 30", "ILCE-6700", "X-T30 II", "X100VI", "X-T50"]),
    getCamerasByModels(["Z 9", "ILCE-9M3", "EOS R1"]),
    getCameras({ limit: 5 }),
  ]);

  return (
    <main className="page content gap-5 flex flex-col">
      <article>
        <div
          className="rounded-xl h-[280px]"
          style={{
            background:
              "no-repeat center url('https://cdn.lilonghe.net/services/camera/img/banner.jpg') #000",
            backgroundSize: "contain",
          }}
        ></div>
      </article>
      <article>
        <h2 className="text-xl">最新发布</h2>
        <section className="flex flex-wrap justify-between gap-3 mt-3">
          {latestRes.map((item) => (
            <CameraCard key={item.model} data={item} />
          ))}
        </section>
      </article>
      <article>
        <h2 className="text-xl">热门相机</h2>
        <section className="flex flex-wrap justify-between gap-3 mt-3">
          {res.map((item) => (
            <CameraCard key={item.model} data={item} />
          ))}
        </section>
      </article>
      <article>
        <h2 className="text-xl">旗舰相机</h2>
        <section className="flex flex-wrap justify-between gap-3 mt-3">
          {flagshipRes.map((item) => (
            <CameraCard key={item.model} data={item} />
          ))}
        </section>
      </article>
    </main>
  );
}
