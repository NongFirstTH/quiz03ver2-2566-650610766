import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Tanabodee Srikhampa",
    studentId: "650610766",
  });
};
