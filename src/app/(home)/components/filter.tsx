"use client";
import { IPageProps } from "@/types/interface";
import { Button, TextField } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function Filter({
  params,
}: {
  params: IPageProps["searchParams"];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [keyword, setKeyword] = useState(params["keyword"]);

  const handleSearch = () => {
    const newParams = new URLSearchParams(params as Record<string, string>);
    newParams.set("keyword", inputRef.current?.value || "");

    router.push("?" + newParams.toString());
  };

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    setKeyword(params["keyword"] || "");
  }, [params]);

  return (
    <div className="flex">
      <TextField.Root
        placeholder="相机名称或型号"
        className="flex-1 sm:flex-none sm:w-[165px] outline-none"
        variant="soft"
        value={keyword}
        ref={inputRef}
        onChange={handleKeywordChange}
      ></TextField.Root>
      <Button variant="soft" className="ml-1" onClick={handleSearch}>
        搜索
      </Button>
    </div>
  );
}
