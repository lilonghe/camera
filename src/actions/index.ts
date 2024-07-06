"use server";
import db from "@/db";
import { ICameraListItem } from "@/db/interface";
import { IPageProps } from "@/types/interface";

export async function getCameras() {
  const result = await db.query(
    "select id, brand, model, alias, publishDate, weight, effectivePixels, frame, imageSensor, imageSensorSize from camera order by publishDate desc,createdAt desc limit 30"
  );
  return result[0] as ICameraListItem[];
}

export async function getCamera({ id }: IPageProps["params"]) {
  const result = await db.query(
    "select id, brand, model, alias, publishDate, weight, effectivePixels, frame, imageSensor, imageSensorSize, dimensionsList from camera where id = ?",
    [id]
  );
  return (result[0] as ICameraListItem[])[0];
}
