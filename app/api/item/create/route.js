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

    // var now = new Date();
    // var nowTimeUTC = now.toUTCString();
    // var nowTimeJST = new Date(nowTimeUTC + 9 * 60 * 60 * 1000);
    // // var now_time = nowTime;
    // reqBody.postDate = nowTimeJST.toLocaleString();

    const now = Temporal.Now.instant(); //  ExactTime / タイムスタンプ
    const TokyoTime = Temporal.Instant.from(now).toZonedDateTimeISO("Asia/Tokyo"); //  タイムゾーン(東京)の時刻に変換
    reqBody.postDate = TokyoTime.toLocaleString("ja-jp", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })

    await ItemModel.create(reqBody);

    return NextResponse.json({ message: "アイテム作成成功" });
  } catch {
    return NextResponse.json({ message: "アイテム作成失敗" });

  }


}

