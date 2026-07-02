import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

type Booking =
  Database["public"]["Tables"]["bookings"]["Row"];

export async function getBookings(
  employeeId: string,
  date: Date
): Promise<Booking[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("employee_id", employeeId)
    .neq("status", "cancelled")
    .lte("start_time", endOfDay.toISOString())
    .gte("end_time", startOfDay.toISOString())
    .order("start_time");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}