import { getCamera, getCameraForSEO } from "@/actions";
import { IPageProps } from "@/types/interface";
import { Button } from "@radix-ui/themes";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import Dimension from "./components/dimension";
import ImageSensor from "./components/image-sensor";
import MetaInfo from "./components/meta-info";
import Preview from "./components/preview";

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
          {target && (
            <Button asChild variant="soft" size={"1"} className="ml-1">
              <Link href={"/?from=compare&id=" + target?.id} rel="nofollow">
                更换
              </Link>
            </Button>
          )}
        </div>
        {target && (
          <TargetWrapper>
            {target?.brand} {target?.alias || target?.model}
            <Button asChild variant="soft" size={"1"} className="ml-1">
              <Link href={"/?from=compare&id=" + res.id} rel="nofollow">
                更换
              </Link>
            </Button>
          </TargetWrapper>
        )}
      </h2>
      <div className="text-gray-400 text-sm flex sm:gap-0 gap-2">
        {res.publishDate?.toLocaleDateString()}
        {target && (
          <TargetWrapper>
            {target.publishDate?.toLocaleDateString()}
          </TargetWrapper>
        )}
      </div>
      <div className="mt-2 flex sm:flex-row flex-col">
        <MetaInfo {...res} />
        {target && (
          <TargetWrapper>
            <MetaInfo {...target} />
          </TargetWrapper>
        )}
      </div>
      {res.thumbnail && (
        <div>
          <div className="mt-5 font-thin">预览图</div>
          <div className="mt-2 flex gap-2 items-end">
            <Preview url={res.thumbnail} />
            {target?.thumbnail && <Preview url={target.thumbnail} />}
          </div>
        </div>
      )}
      {res.imageSensorSize && (
        <>
          <div className="mt-5 font-thin">传感器</div>
          <div className="mt-1 flex gap-2 items-end">
            <ImageSensor imageSensorSize={res.imageSensorSize} />
            {target && <ImageSensor imageSensorSize={target.imageSensorSize} />}
          </div>
        </>
      )}

      {res.dimensionsList && (
        <>
          <div className="mt-5 font-thin">尺寸预览</div>
          <div className="overflow-y-auto flex flex-col gap-2 mt-1">
            <Dimension dimensionsList={res.dimensionsList} />
            {target && <Dimension dimensionsList={target.dimensionsList} />}
          </div>
        </>
      )}

      {/* {!target && (
        <Link href={"/?from=compare&id=" + res.id} rel="nofollow">
          <Button variant="soft" className="mt-2">
            {"选择对比"}
          </Button>
        </Link>
      )} */}

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
