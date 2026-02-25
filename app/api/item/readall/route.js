import { NextResponse } from "next/server";
import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

export async function GET() {

  try {
    await connectDB();
    const allItems = await ItemModel.find();
    return NextResponse.json({ message: "アイテム読取り成功(all)" , allItems: allItems});
  } catch {
    return NextResponse.json({ message: "アイテム読取り失敗(all)" });
  }

}

export const revalidate = 0;