"use server";
import db from "@/db";
import { ICameraListItem } from "@/db/interface";
import { IPageProps } from "@/types/interface";
import { revalidatePath } from "next/cache";

export async function getCameras({ keyword = "" }) {
  keyword = keyword.replaceAll("-", "").toLowerCase();

  let condition = "where 1 = 1",
    values: any = {};
  if (keyword) {
    condition += ` and (
      keyword LIKE :keyword
    )`;
    values.keyword = `%${keyword}%`;
  }
  const result = await db.query(
    `select id, brand, model, alias, publishDate, weight, effectivePixels, frame, imageSensor, imageSensorSize 
    from camera 
    ${condition}
    order by publishDate desc,createdAt desc 
    limit 30`,
    values
  );

  revalidatePath("/");
  return result[0] as ICameraListItem[];
}

export async function getCamera({ id }: IPageProps["params"]) {
  const result = await db.query(
    "select id, brand, model, alias, publishDate, weight, effectivePixels, frame, imageSensor, imageSensorSize, dimensionsList from camera where id = ?",
    [id]
  );
  return (result[0] as ICameraListItem[])[0];
}
