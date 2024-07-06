"use client";
import { IPageProps } from "@/types/interface";
import { Button, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Filter({
  params,
}: {
  params: IPageProps["searchParams"];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = () => {
    const newParams = new URLSearchParams(params as Record<string, string>);
    newParams.set("keyword", inputRef.current?.value || "");

    router.push("?" + newParams.toString());
  };

  return (
    <div className="flex">
      <TextField.Root
        placeholder="相机名称或型号"
        className="w-[165px] outline-none"
        variant="soft"
        defaultValue={params["keyword"]}
        ref={inputRef}
      ></TextField.Root>
      <Button variant="soft" className="ml-1" onClick={handleSearch}>
        搜索
      </Button>
    </div>
  );
}
