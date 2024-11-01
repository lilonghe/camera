import { getCamera, getCameraForSEO } from "@/actions";
import { IPageProps } from "@/types/interface";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import CameraDetailContent from "./camera";

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
    <CameraDetailContent data={res} />
  );
}
