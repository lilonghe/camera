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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setError(null);

      try {
        const data = await exifr.parse(file, { xmp: true });
        console.log(data);
        setExifData(data);

        const blobUrl = URL.createObjectURL(file);
        setBlobUrl(blobUrl);
      } catch (err) {
        setError("Error reading EXIF data");
      }
    } else {
      setFile(null);
      setExifData(null);
      setError(null);
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
      <div className="w-full sm:w-[300px]">
        <Upload onChange={handleFileChange} />
      </div>
      {blobUrl && (
        <div className="mt-5 flex flex-col sm:flex-row gap-5">
          <img
            src={blobUrl}
            alt="image"
            className="max-w-[300px] max-h-[300px] object-cover"
          />

          {exifData && <ExifDetail data={exifData} />}
        </div>
      )}

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
