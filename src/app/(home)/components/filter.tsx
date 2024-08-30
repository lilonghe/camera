"use client";
import useDebounce from "@/hooks/useDebounce";
import { IPageProps } from "@/types/interface";
import { Button, DropdownMenu, TextField } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { brandOptions, sortByOptions, timeRangeOptions } from "./config";

export default function Filter({
  params,
}: {
  params: IPageProps["searchParams"];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [keyword, setKeyword] = useState(params["keyword"]);
  const debouncedKeyword = useDebounce(keyword, 300);

  const [sortBy, setSortBy] = useState<string | undefined>(params["sortBy"]);
  const [timeRange, setTimeRange] = useState<number | undefined>(
    params["timeRange"] ? parseInt(params["timeRange"]) : undefined
  );
  const [brand, setBrand] = useState<string | undefined>(params["brand"]);

  const handleSearch = () => {
    const newParams = new URLSearchParams();
    if (inputRef.current?.value) {
      newParams.set("keyword", inputRef.current?.value);
    }
    if (sortBy) {
      newParams.set("sortBy", sortBy);
    }
    if (timeRange) {
      newParams.set("timeRange", timeRange.toString());
    }
    if (brand) {
      newParams.set("brand", brand);
    }

    router.push("?" + newParams.toString());
  };

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSortByChange = (key: string) => {
    if (key === sortBy) {
      setSortBy(undefined);
    } else {
      setSortBy(key);
    }
  };

  const handleBrandChange = (key: string) => {
    if (key === brand) {
      setBrand(undefined);
    } else {
      setBrand(key);
    }
  };

  const handleTimeRangeChange = (key?: number) => {
    if (timeRange === key) {
      setTimeRange(undefined);
    } else {
      setTimeRange(key);
    }
  };

  useEffect(() => {
    setKeyword(params["keyword"]);
    setSortBy(params["sortBy"]);
    setTimeRange(
      params["timeRange"] ? parseInt(params["timeRange"]) : undefined
    );
    setBrand(params["brand"]);
  }, [params]);

  useEffect(() => {
    handleSearch();
  }, [debouncedKeyword, sortBy, timeRange, brand]);

  const sortLabel = sortByOptions.find((item) => item.value === sortBy)?.label;

  return (
    <div className="flex flex-wrap gap-y-2">
      <TextField.Root
        placeholder="相机名称或型号"
        className="flex-1 min-w-full sm:min-w-[auto] sm:flex-none sm:w-[165px] outline-none"
        variant="soft"
        value={keyword || ""}
        ref={inputRef}
        onChange={handleKeywordChange}
      ></TextField.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="sm:ml-1">
          <Button variant="soft" color={sortBy ? "indigo" : undefined}>
            {sortLabel ? "排序方式：" + sortLabel : "排序方式"}
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {sortByOptions.map((item) => (
            <DropdownMenu.CheckboxItem
              key={item.value}
              checked={sortBy === item.value}
              onCheckedChange={() => handleSortByChange(item.value)}
            >
              {item.label}
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="ml-1">
          <Button variant="soft" color={timeRange ? "indigo" : undefined}>
            {timeRangeOptions.find((item) => item.value === timeRange)?.label ||
              "时间范围"}
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {timeRangeOptions.map((item) => (
            <DropdownMenu.CheckboxItem
              key={item.value}
              checked={timeRange === item.value}
              onCheckedChange={() => handleTimeRangeChange(item.value)}
            >
              {item.label}
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="ml-1">
          <Button variant="soft" color={brand ? "indigo" : undefined}>
            {brandOptions.find((item) => item.value === brand)?.label || "品牌"}
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {brandOptions.map((item) => (
            <DropdownMenu.CheckboxItem
              key={item.value}
              checked={brand === item.value}
              onCheckedChange={() => handleBrandChange(item.value)}
            >
              {item.label}
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
