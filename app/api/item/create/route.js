import { NextResponse } from "next/server";
import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";
import { Temporal } from 'temporal-polyfill';

export async function POST(request) {

  const reqBody = await request.json();
  // console.log(reqBody);

  try {
    // console.log(await request.json());
    await connectDB();

    const now = Temporal.Now.instant(); //  ExactTime / タイムスタンプ
    const TokyoTime = Temporal.Instant.from(now).toZonedDateTimeISO("Asia/Tokyo"); //  タイムゾーン(東京)の時刻に変換
    const format_TokyoTime = TokyoTime.toLocaleString("ja-jp", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    reqBody.postDate = format_TokyoTime;
    reqBody.editDate = format_TokyoTime;

    await ItemModel.create(reqBody);

    return NextResponse.json({ message: "アイテム作成成功" });
  } catch {
    return NextResponse.json({ message: "アイテム作成失敗" });

  }


}

