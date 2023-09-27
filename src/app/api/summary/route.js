import { DB, readDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { NextResponse } from "next/server";

export const GET = () => {
  const payload = checkToken();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Invalid token",
  //   },
  //   { status: 401 }
  // );

  const rooms = [];
  readDB();

  return NextResponse.json({
    ok: true,
    rooms,
  });
};
