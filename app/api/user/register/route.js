import { NextResponse } from "next/server";
import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";


export async function POST(request) {
  const reqBody = await request.json();

  try{
    await connectDB();
    await UserModel.create(reqBody);
    return NextResponse.json({ message: "ユーザ登録成功" });
  }catch{
    return NextResponse.json({ message: "ユーザ登録成功" });
  }
}