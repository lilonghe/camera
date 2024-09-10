"use server";
import db from "@/db";
import { ICameraListItem } from "@/db/interface";
import { RowDataPacket } from "mysql2";
import { revalidatePath } from "next/cache";

export async function getCameras({
  keyword,
  sortBy,
  timeRange,
  brand,
}: {
  keyword?: string;
  sortBy?: string;
  timeRange?: number;
  brand?: string;
}) {
  keyword = keyword?.replaceAll("-", "").toLowerCase();

  let condition = "where 1 = 1",
    orderBy = "order by ";
  const values: any = {};

  if (keyword) {
    condition += ` and (
      keyword LIKE :keyword
    )`;
    values.keyword = `%${keyword}%`;
  }

  if (timeRange) {
    const timeRangeStart = new Date();
    timeRangeStart.setDate(timeRangeStart.getDate() - timeRange);
    condition += ` and publishDate >= :timeRangeStart`;
    values.timeRangeStart = timeRangeStart;
  }

  if (brand) {
    condition += ` and brand = :brand`;
    values.brand = brand;
  }

  if (sortBy) {
    if (sortBy === "pixel") {
      orderBy += `effectivePixels desc,`;
    } else if (sortBy === "weight") {
      orderBy += `weight desc,`;
    }
  }
  orderBy += ` publishDate desc`;

  const result = await db.query(
    `select id, brand, model, alias, publishDate, weight, effectivePixels, frame, imageSensor, imageSensorSize, thumbnail, parameter 
    from camera 
    ${condition}
    ${orderBy}
    limit 50`,
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

export async function getCameraForSEO({ id }: { id: string }) {
  const result = await db.query(
    "select id, brand, model, alias, keyword from camera where id = ?",
    [id]
  );

  return (result[0] as ICameraListItem[])[0];
}

export async function getCamera({ id, userAgent, ip }: getCameraProps) {
  const result = await db.query(
    "select id, brand, model, alias, publishDate, weight, effectivePixels, frame, imageSensor, imageSensorSize, dimensionsList, thumbnail, parameter from camera where id = ?",
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
