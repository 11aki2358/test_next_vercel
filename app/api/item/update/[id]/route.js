import { NextResponse } from "next/server";
import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";

export async function PUT(request, context) {
  const reqBody = await request.json();
  try {
    await connectDB();

    // https://monotein-books.netlify.app/nextjs-react-book-additional-info-1
    const params = await context.params;
    const singleItem = await ItemModel.findById(params.id);
    if (singleItem.userID === reqBody.userID) {

      var now = new Date();
      var nowTime = now.toLocaleString();
      // var now_time = nowTime;
      reqBody.editDate = nowTime;

      await ItemModel.updateOne({ _id: params.id }, reqBody);

      return NextResponse.json({ message: "アイテム編集ok" });
    } else {
      return NextResponse.json({ message: "アイテム編集不可(他の人が作成したアイテムです" });
    }

  } catch {
    return NextResponse.json({ message: "アイテム編集NG" });
  }

}