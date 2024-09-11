import { ICameraListItem } from "@/db/interface";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Tooltip } from "@radix-ui/themes";
import { ReactNode } from "react";

export default function CameraMoreInfo({
  children,
  data,
  className = "",
}: {
  children?: ReactNode;
  data: ICameraListItem;
  className?: string;
}) {
  if (!data.parameter) return null;

  return (
    <Tooltip
      title="更多信息"
      content={
        <div className="max-w-[160px] break-all">
          <div className="max-w-[100px]">
            {data.parameter.hasMShutter !== undefined && (
              <div className="flex justify-between gap-1">
                <span>机械快门：</span>
                <span>{data.parameter.hasMShutter ? "有" : "无"}</span>
              </div>
            )}
            {data.parameter.ois !== undefined && (
              <div className="flex justify-between gap-1">
                <span>机身防抖：</span>
                <span>{data.parameter.ois ? "有" : "无"}</span>
              </div>
            )}
          </div>

          {data.parameter.remark && (
            <div className="mt-2">{data.parameter.remark}</div>
          )}
        </div>
      }
    >
      {children || (
        <InfoCircledIcon
          className={"cursor-pointer text-gray-400 " + className}
        />
      )}
    </Tooltip>
  );
}
