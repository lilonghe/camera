"use client";
import { useEffect, useRef } from "react";
import type { WebGLRenderer } from "three";
import { renderView } from "./draw";

export default function Light() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const renderRef = useRef<WebGLRenderer>();

  useEffect(() => {
    if (renderRef.current) return;
    renderRef.current = renderView(wrapperRef.current as HTMLElement);
  }, []);

  return <div ref={wrapperRef}></div>;
}
