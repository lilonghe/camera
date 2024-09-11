import { ICameraListItem } from "@/db/interface";
import { Card, Tooltip } from "@radix-ui/themes";
import Link from "next/link";
import LazyImg from "../lazy-img";
import Parameter from "./parameter";

export default function CameraCard({ data }: { data: ICameraListItem }) {
  return (
    <Link
      key={data.id}
      prefetch={false}
      href={`/camera/${data.id}`}
      className="w-[220px] flex-grow 2xl:flex-grow-0"
    >
      <Card variant="surface" className="hover:shadow-sm">
        <div>
          <Tooltip content={data.model}>
            <p className="inline-flex">{data.alias || data.model}</p>
          </Tooltip>
          <p className="text-xs text-gray-300">
            {data.publishDate?.toLocaleDateString()}
            {data.price && <span className="ml-2">¥4399</span>}
          </p>
        </div>

        <div className="mt-2">
          <p className="text-gray-400 text-sm">{data.brand}</p>
          <Parameter item={data} />
        </div>

        {data.thumbnail && (
          <LazyImg
            loading="lazy"
            alt="thumbnail"
            src={(process.env.CDN_HOST || "") + data.thumbnail}
            className="absolute top-2.5 right-2.5"
            width={50}
          />
        )}
      </Card>
    </Link>
  );
}
