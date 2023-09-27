import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const rooms = request.nextUrl.searchParams.get("rooms");
  readDB();
  let filtered = DB.rooms;
  if (rooms !== null) {
    filtered = filtered.filter((std) => std.rooms === rooms);
  }
  return NextResponse.json({
    ok: true,
    rooms: filtered,
    totalRooms: filtered.length,
  });
};

export const POST = async (request) => {
  const payload = checkToken();
  if (!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }
  
  const body = await request.json();
  readDB();
  const foundRoom = DB.rooms.find((x) => x.roomName === body.roomName);
  if (foundRoom) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${body.roomName} already exists`,
      },
      { status: 400 }
    );
  }

  const roomId = nanoid();
  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${body.roomName} has been created`,
  });
};
