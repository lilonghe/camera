import { ICameraListItem } from "@/db/interface";
import Dimension from "./components/dimension";
import ImageSensor from "./components/image-sensor";
import MetaInfo from "./components/meta-info";
import Preview from "./components/preview";
import VisitCount from "./components/visit-count";

export default function CameraDetailContent({ data }: { data: ICameraListItem }) {
  return (
    <div className="page content">
      <h2 className="text-3xl font-medium flex sm:items-center sm:flex-row flex-col">
        <div className="flex items-center">
          {data.brand} {data.alias || data.model}
        </div>
      </h2>
      <div className="text-gray-400 text-xs flex items-center gap-2">
        {data.publishDate?.toLocaleDateString()}
        <VisitCount cameraId={data.id} />
      </div>
      <div className="mt-2 flex flex-col">
        <MetaInfo {...data} />
      </div>
      {data.thumbnail && (
        <div>
          <div className="mt-5 font-thin">预览图</div>
          <div className="mt-2 flex gap-2 items-end">
            <Preview url={data.thumbnail} />
          </div>
        </div>
      )}
      {data.imageSensorSize && (
        <>
          <div className="mt-5 font-thin">传感器</div>
          <div className="mt-1 flex gap-2 items-end">
            <ImageSensor imageSensorSize={data.imageSensorSize} />
          </div>
        </>
      )}

      {data.dimensionsList && (
        <>
          <div className="mt-5 font-thin">尺寸预览</div>
          <div className="overflow-y-auto flex flex-col gap-2 mt-1">
            <Dimension dimensionsList={data.dimensionsList} />
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