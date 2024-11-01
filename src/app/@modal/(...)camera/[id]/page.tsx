import { getCamera } from "@/actions";
import CameraDetailContent from "@/app/camera/[id]/camera";
import Modal from "@/components/ui/modal";
import { IPageProps } from "@/types/interface";
import { headers } from "next/headers";

export default async function CameraModal({ params }: IPageProps) {
  const headersList = headers();
  const extraParams = {
    userAgent: headersList.get("user-agent") || "",
    ip: headersList.get("x-real-ip") || "",
  };
  const res = await getCamera({ id: params.id, ...extraParams });

  return <Modal>
    <CameraDetailContent data={res} />
  </Modal>
}