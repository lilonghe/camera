"use client";
import { Button, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Filter({ keyword = "" }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = () => {
    router.push("?keyword=" + inputRef.current?.value);
  };

  return (
    <div className="flex">
      <TextField.Root
        placeholder="相机名称或型号"
        className="w-[200px] outline-none"
        variant="soft"
        defaultValue={keyword}
        ref={inputRef}
      ></TextField.Root>
      <Button variant="soft" className="ml-1" onClick={handleSearch}>
        搜索
      </Button>
    </div>
  );
}
