import { createClient } from "@/utils/supabase/server";
import type { Database } from "@/types/database.types";
import { cookies } from "next/headers";

type Service = Database["public"]["Tables"]["services"]["Row"];

export async function getServices(): Promise<Service[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}