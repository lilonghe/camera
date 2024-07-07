"use server";
import db from "@/db";
import { ICameraListItem } from "@/db/interface";
import { RowDataPacket } from "mysql2";
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

export interface getCameraProps {
  id: string;
  userAgent: string;
  ip: string;
}

export async function getCamera({ id, userAgent, ip }: getCameraProps) {
  const result = await db.query(
    "select id, brand, model, alias, publishDate, weight, effectivePixels, frame, imageSensor, imageSensorSize, dimensionsList from camera where id = ?",
    [id]
  );

  // add visit record
  await db.execute(
    "insert into visit (userAgent, ip, cameraId) values (?, ?, ?)",
    [userAgent, ip, id]
  );

  return (result[0] as ICameraListItem[])[0];
}

/**
 * 统计一款相机的浏览次数，根据 ip 去重
 * @param cameraId
 * @returns
 */
export async function getCameraVisitCount(cameraId: string) {
  const [rows] = await db.query<RowDataPacket[]>(
    "select count(DISTINCT ip) as count from visit where cameraId = ? group by cameraId",
    [cameraId]
  );
  return rows[0] as { count: number };
}
