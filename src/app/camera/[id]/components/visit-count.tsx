"use client";

import { getCameraVisitCount } from "@/actions";
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

  return <span className="text-gray-400 text-xs">有 {count} 人浏览过</span>;
}
