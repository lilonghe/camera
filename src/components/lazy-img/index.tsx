"use client";
import { ImgHTMLAttributes, useEffect, useRef } from "react";

export type LazyImgType = ImgHTMLAttributes<HTMLImageElement> & {
  // 距离可视区域多久时加载
  margin?: string;
};

const PlaceholderImg = `data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==`;

export default function LazyImg({ src, margin, ...rest }: LazyImgType) {
  const imgRef = useRef<HTMLImageElement>(null);

  const loadImg = () => {
    if (!src || !imgRef.current) return;

    const img = new Image();
    img.onload = () => {
      imgRef.current && (imgRef.current.src = src);
    };
    img.onerror = () => {
      if (imgRef.current) {
        imgRef.current.style.display = "none";
      }
    };
    img.src = src;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio <= 0) return;
        observer.disconnect();
        loadImg();
      },
      {
        rootMargin: margin,
      }
    );

    imgRef.current && observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return <img alt={rest.alt} {...rest} ref={imgRef} src={PlaceholderImg} />;
}
