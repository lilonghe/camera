import { Spinner } from "@radix-ui/themes";

export default function Loading() {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <Spinner size={"3"} />
    </div>
  );
}
