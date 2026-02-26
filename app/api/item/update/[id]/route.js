import { NextResponse } from "next/server";
import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";
import { Temporal } from 'temporal-polyfill';

export async function PUT(request, context) {
  const reqBody = await request.json();
  try {
    await connectDB();

    // https://monotein-books.netlify.app/nextjs-react-book-additional-info-1
    const params = await context.params;
    const singleItem = await ItemModel.findById(params.id);
    if (singleItem.userID === reqBody.userID) {

      const now = Temporal.Now.instant(); //  ExactTime / タイムスタンプ
      const TokyoTime = Temporal.Instant.from(now).toZonedDateTimeISO("Asia/Tokyo"); //  タイムゾーン(東京)の時刻に変換
      reqBody.editDate = TokyoTime.toLocaleString("ja-jp", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      await ItemModel.updateOne({ _id: params.id }, reqBody);

      return NextResponse.json({ message: "アイテム編集ok" });
    } else {
      return NextResponse.json({ message: "アイテム編集不可(他の人が作成したアイテムです" });
    }

  } catch {
    return NextResponse.json({ message: "アイテム編集NG" });
  }

}