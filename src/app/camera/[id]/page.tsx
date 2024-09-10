import { getCamera, getCameraForSEO } from "@/actions";
import { IPageProps } from "@/types/interface";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import Dimension from "./components/dimension";
import ImageSensor from "./components/image-sensor";
import MetaInfo from "./components/meta-info";
import Preview from "./components/preview";
import VisitCount from "./components/visit-count";

export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
  const res = await getCameraForSEO({ id: params.id });

  if (!res) return {};
  return {
    title: `${res.brand} ${res.alias || res.model} - Camera`,
    keywords: [res.brand, res.model, ...res.keyword.split(",")],
    other: {},
  };
}

const TargetWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="sm:ml-2 sm:pl-2 sm:border-l border-dashed inline-flex items-center">
      {children}
    </div>
  );
};

export default async function CameraDetail({
  params,
  searchParams,
}: IPageProps) {
  const headersList = headers();
  const extraParams = {
    userAgent: headersList.get("user-agent") || "",
    ip: headersList.get("x-real-ip") || "",
  };
  const res = await getCamera({ id: params.id, ...extraParams });

  let target;
  if (searchParams["targetId"]) {
    target = await getCamera({ id: searchParams["targetId"], ...extraParams });
  }

  if (!res?.model) {
    notFound();
  }

  return (
    <div className="page content">
      <h2 className="text-3xl font-medium flex sm:items-center sm:flex-row flex-col">
        <div className="flex items-center">
          {res.brand} {res.alias || res.model}
        </div>
      </h2>
      <div className="text-gray-400 text-xs flex items-center gap-2">
        {res.publishDate?.toLocaleDateString()}
        <VisitCount cameraId={res.id} />
      </div>
      <div className="mt-2 flex flex-col">
        <MetaInfo {...res} />
      </div>
      {res.thumbnail && (
        <div>
          <div className="mt-5 font-thin">预览图</div>
          <div className="mt-2 flex gap-2 items-end">
            <Preview url={res.thumbnail} />
          </div>
        </div>
      )}
      {res.imageSensorSize && (
        <>
          <div className="mt-5 font-thin">传感器</div>
          <div className="mt-1 flex gap-2 items-end">
            <ImageSensor imageSensorSize={res.imageSensorSize} />
          </div>
        </>
      )}

      {res.dimensionsList && (
        <>
          <div className="mt-5 font-thin">尺寸预览</div>
          <div className="overflow-y-auto flex flex-col gap-2 mt-1">
            <Dimension dimensionsList={res.dimensionsList} />
          </div>
        </>
      )}

      <ul className="mt-5 text-stone-300 text-sm">
        <li>
          <sup>*</sup>此处预览的尺寸为了便于产看，进行了等比缩小一倍处理
        </li>
        <li>
          <sup>*</sup>
          相机尺寸通常包含了完整尺寸，包括目镜及手柄，所以轮廓可能会显得比较大一些，后期会陆续更新真实照片
        </li>
      </ul>
    </div>
  );
}
