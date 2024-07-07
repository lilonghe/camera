"use client";

import { getCameraVisitCount } from "@/actions";
import { Badge, Tooltip } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export default function VisitCount({ cameraId }: { cameraId: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCameraVisitCount(cameraId).then((res) => {
      setCount(res.count);
    });
  }, [cameraId]);

  if (count <= 0) {
    return null;
  }

  return (
    <Tooltip content={`共有 ${count} 人查看过`}>
      <Badge color="gray" className="cursor-pointer">
        {count}
      </Badge>
    </Tooltip>
  );
}
