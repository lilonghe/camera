"use client";
import Upload from "@/components/ui/upload";
import { AlertDialog, Button } from "@radix-ui/themes";
import exifr from "exifr/dist/full.esm.mjs";
import { useState } from "react";
import ExifDetail from "./components/exif-detail";

export default function Exif() {
  const [exifData, setExifData] = useState<IExifData | null>(null);
  const [_, setFile] = useState<File | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (file: File) => {
    setFile(file);
    setError(null);

    try {
      const data = await exifr.parse(file, { xmp: true });

      if (!data) {
        setError("无法获取所选照片的信息，请确保是原始照片");
        return;
      }
      if (!data.Model || !data.ISO) {
        setError("照片可能已经过处理，无法获取信息");
        return;
      }
      setExifData(data);

      const blobUrl = URL.createObjectURL(file);
      setBlobUrl(blobUrl);

      // const form = new FormData();
      // form.append("file", file);
      // const res = await getExifInfo(form);
      // console.log("server info", res);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCloseError = () => {
    setError(null);
    setFile(null);
  };

  return (
    <div className="content py-5">
      <div className="mb-3 text-gray-500">
        查看照片的具体信息，如光圈，快门，ISO，相机型号，序列号，镜头型号，序列号等
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-5 mb-5">
        <div className="w-full sm:w-[300px]">
          <Upload onChange={handleFileChange} />
        </div>
        {blobUrl && (
          <img
            src={blobUrl}
            alt="image"
            className="max-h-[256px] object-cover"
            onError={() => setBlobUrl(null)}
          />
        )}
      </div>

      {exifData && <ExifDetail data={exifData} />}

      <AlertDialog.Root open={error != undefined}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>读取文件失败</AlertDialog.Title>
          <AlertDialog.Description size="2">{error}</AlertDialog.Description>

          <div className="flex mt-3">
            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
                className="ml-auto"
                onClick={handleCloseError}
              >
                好的
              </Button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}
