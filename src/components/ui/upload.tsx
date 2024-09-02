import { FilePlusIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useEffect, useRef } from "react";

export default function Upload({
  onChange,
}: {
  onChange: (file: File) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  useEffect(() => {
    const dragEvent = (e: DragEvent) => {
      e.preventDefault();
    };

    const dropEvent = (e: DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        onChange(files[0]);
      }
    };

    if (ref.current) {
      ref.current.addEventListener("dragover", dragEvent);
      ref.current.addEventListener("drop", dropEvent);
    }

    return () => {
      ref.current?.removeEventListener("dragover", dragEvent);
      ref.current?.removeEventListener("drop", dropEvent);
    };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <FilePlusIcon width={30} height={30} color="#666" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 mt-3">
            <span className="font-semibold">点击上传照片</span> 或拖拽照片到此处
          </p>
          <p className="text-xs text-gray-500">支持 JPG, JPEG, PNG</p>
          <p className="text-xs text-gray-400 px-10 mt-2">
            RAW 文件需要上传到服务器才可以分析
            <br />
            服务器带宽较小，且存在数据隐私问题
            <br />
            故暂不提供此模式
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleChange}
          accept=".jpg,.jpeg,.png"
        />
      </label>
    </div>
  );
}
