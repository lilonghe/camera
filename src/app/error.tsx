"use client";

import { Button } from "@radix-ui/themes";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <h2>出现了一些问题，请稍后重试</h2>
      <br />
      <Button variant="soft" onClick={() => reset()}>
        点击重试
      </Button>
    </div>
  );
}
