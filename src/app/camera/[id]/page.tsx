import { getCamera } from "@/actions";
import { IPageProps } from "@/types/interface";
import { Button } from "@radix-ui/themes";
import { headers } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";
import Dimension from "./components/dimension";
import ImageSensor from "./components/image-sensor";
import MetaInfo from "./components/meta-info";

const TargetWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="ml-2 pl-2 border-l border-dashed inline-flex items-center">
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

  return (
    <div className="page content">
      <h2 className="text-3xl font-medium flex items-center">
        {res.brand} {res.alias || res.model}
        {target && (
          <>
            <Button asChild variant="soft" size={"1"} className="ml-1">
              <Link href={"/?from=compare&id=" + target?.id}>更换</Link>
            </Button>
            <TargetWrapper>
              {target?.brand} {target?.alias || target?.model}
              <Button asChild variant="soft" size={"1"} className="ml-1">
                <Link href={"/?from=compare&id=" + res.id}>更换</Link>
              </Button>
            </TargetWrapper>
          </>
        )}
      </h2>
      <div className="text-gray-400 text-sm">
        {res.publishDate?.toLocaleDateString()}
        {target && (
          <TargetWrapper>
            {target.publishDate?.toLocaleDateString()}
          </TargetWrapper>
        )}
      </div>
      <div className="mt-2 flex">
        <MetaInfo {...res} />
        {target && (
          <TargetWrapper>
            <MetaInfo {...target} />
          </TargetWrapper>
        )}
      </div>
      {(res.imageSensorSize || target?.imageSensorSize) && (
        <>
          <div className="mt-5 font-thin">传感器</div>
          <div className="mt-1 flex gap-2 items-end">
            <ImageSensor imageSensorSize={res.imageSensorSize} />
            {target && <ImageSensor imageSensorSize={target.imageSensorSize} />}
          </div>
        </>
      )}

      {(res.dimensionsList || target?.dimensionsList) && (
        <>
          <div className="mt-5 font-thin">尺寸预览</div>
          <div className="overflow-y-auto flex flex-col gap-2 mt-1">
            <Dimension dimensionsList={res.dimensionsList} />
            {target && <Dimension dimensionsList={target.dimensionsList} />}
          </div>
        </>
      )}

      {!target && (
        <Link href={"/?from=compare&id=" + res.id}>
          <Button variant="soft" className="mt-2">
            {"选择对比"}
          </Button>
        </Link>
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
