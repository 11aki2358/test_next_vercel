import { NextResponse } from "next/server";
import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

export async function POST(request) {

  const reqBody = await request.json();
  // console.log(reqBody);



  try {
    // console.log(await request.json());
    await connectDB();

    var now = new Date();
    var nowTime = now.toLocaleString();
    // var now_time = nowTime;
    reqBody.postDate = nowTime;
    
    await ItemModel.create(reqBody);

    return NextResponse.json({ message: "アイテム作成成功" });
  } catch {
    return NextResponse.json({ message: "アイテム作成失敗" });

  }


}

