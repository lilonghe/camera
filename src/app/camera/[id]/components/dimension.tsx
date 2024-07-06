import { ICameraListItem } from "@/db/interface";
import { AspectRatio } from "@radix-ui/themes";

export default function Dimension({
  dimensionsList = [],
}: {
  dimensionsList: ICameraListItem["dimensionsList"];
}) {
  const scale = 0.5;

  const ViewItem = ({ w = 0, h = 0 }) => {
    return (
      <div
        style={{
          width: w * scale + "mm",
        }}
      >
        <AspectRatio
          ratio={w / h}
          className="border border-dashed border-gray-400 text-gray-400 rounded flex items-center justify-center"
        >
          <span className="absolute top-1 left-1/2 -translate-x-1/2">
            {w}mm
          </span>
          <span
            className="absolute right-1 top-1/2 -translate-y-1/2"
            style={{ writingMode: "vertical-lr" }}
          >
            {h}mm
          </span>
        </AspectRatio>
      </div>
    );
  };

  return (
    <div
      className="flex whitespace-nowrap gap-2 select-none text-sm"
      style={{
        width: `calc((${dimensionsList[0]}mm + ${dimensionsList[1]}mm) * ${scale} + 1rem)`,
      }}
    >
      <ViewItem w={dimensionsList[0]} h={dimensionsList[1]} />
      <ViewItem w={dimensionsList[2]} h={dimensionsList[1]} />
    </div>
  );
}
