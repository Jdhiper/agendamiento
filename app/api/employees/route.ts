import { NextRequest, NextResponse } from "next/server";
import { getEmployeesByService } from "@/lib/booking/getEmployeesByService";

export async function GET(request: NextRequest) {
  const serviceId = request.nextUrl.searchParams.get("serviceId");

  if (!serviceId) {
    return NextResponse.json(
      { error: "El serviceId es obligatorio" },
      { status: 400 }
    );
  }

  const employees = await getEmployeesByService(serviceId);

  return NextResponse.json(employees);
}