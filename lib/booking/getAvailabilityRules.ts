import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

type AvailabilityRule =
  Database["public"]["Tables"]["availability_rules"]["Row"];

export async function getAvailabilityRules(
  employeeId: string,
  dayOfWeek: number
): Promise<AvailabilityRule[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("availability_rules")
    .select("*")
    .eq("employee_id", employeeId)
    .eq("day_of_week", dayOfWeek)
    .eq("is_active", true)
    .order("start_time");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}