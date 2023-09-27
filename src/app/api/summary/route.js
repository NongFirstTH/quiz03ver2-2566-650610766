import { DB, readDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { NextResponse } from "next/server";

export const GET = () => {
  const payload = checkToken();
  if(!payload){
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
      );
  }
        
  const rooms = [];
  readDB();
  for (const room of DB.rooms) {
    if (room.roomName === roomName) {
      rooms.push(room.roomName);
    }
  }
  return NextResponse.json({
    ok: true,
    rooms,
  });
};
