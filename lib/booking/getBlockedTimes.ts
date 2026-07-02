import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

type BlockedTime =
  Database["public"]["Tables"]["blocked_times"]["Row"];

export async function getBlockedTimes(
  employeeId: string,
  date: Date
): Promise<BlockedTime[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from("blocked_times")
    .select("*")
    .eq("employee_id", employeeId)
    .lte("start_time", endOfDay.toISOString())
    .gte("end_time", startOfDay.toISOString())

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}