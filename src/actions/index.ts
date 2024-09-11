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
  limit = 50,
}: {
  keyword?: string;
  sortBy?: string;
  timeRange?: number;
  brand?: string;
  limit?: number;
}) {
  keyword = keyword?.replaceAll("-", "").toLowerCase();

  let condition = "where 1 = 1",
    orderBy = "order by ";
  const values: any = {
    limit: limit,
  };

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
    `select id, brand, model, alias, publishDate, weight, effectivePixels, frame, imageSensor, imageSensorSize, thumbnail, parameter, price 
    from camera 
    ${condition}
    ${orderBy}
    limit :limit`,
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
    "select id, brand, model, alias, publishDate, weight, effectivePixels, frame, imageSensor, imageSensorSize, dimensionsList, thumbnail, parameter, price from camera where id = ?",
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

/**
 * 根据 model 列表获取相机列表
 * @param models
 * @returns
 */
export async function getCamerasByModels(models: string[]) {
  const result = await db.query(
    `select id, brand, model, alias, publishDate, weight, effectivePixels, frame, imageSensor, imageSensorSize, dimensionsList, thumbnail, parameter, price 
    from camera 
    where model in (?)
    order by publishDate desc`,
    [models]
  );

  return result[0] as ICameraListItem[];
}
