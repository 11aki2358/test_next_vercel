import { NextResponse } from "next/server";
import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";

export async function DELETE(request, context) {
  const reqBody = await request.json();

  try {
    await connectDB();

    // https://monotein-books.netlify.app/nextjs-react-book-additional-info-1
    const params = await context.params;
    const singleItem = await ItemModel.findById(params.id);

    if (singleItem.email === reqBody.email){
      await ItemModel.deleteOne({ _id: params.id });
      return NextResponse.json({ message: "削除成功" });
    }else{
      return NextResponse.json({ message: "削除失敗... 他人のデータです" });
    }


  } catch {
    return NextResponse.json({ message: "削除失敗" });
  }
}