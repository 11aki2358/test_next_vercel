import { NextResponse } from "next/server";
import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";

export async function GET(request, context) {

  // https://monotein-books.netlify.app/nextjs-react-book-additional-info-1

  try {
    await connectDB();
    const params = await context.params                       // 追加
    const singleItem = await ItemModel.findById(params.id)    // 変更
    return NextResponse.json({ message: "アイテム読み取り成功（シングル）", singleItem: singleItem })

  } catch {
    return NextResponse.json({ message: "アイテム読取り失敗(single)" })

  }
}