import { FilePlusIcon } from "@radix-ui/react-icons";
import { ChangeEventHandler } from "react";

export default function Upload({
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <FilePlusIcon width={30} height={30} color="#666" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 mt-3">
            <span className="font-semibold">点击上传照片</span> 或拖拽照片到此处
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  );
}
