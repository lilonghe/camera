"use client";
import { useEffect, useRef } from "react";
import { renderView } from "./draw";

export default function Light() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderView(wrapperRef.current as HTMLElement);
  }, []);

  return <div ref={wrapperRef}></div>;
}
