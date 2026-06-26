import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getEmployeesByService(serviceId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("employee_services")
    .select(`
      employees (*)
    `)
    .eq("service_id", serviceId);

  if (error) {
    console.error(error);
    return [];
  }

  const employees = data
    .map((item) => item.employees)
    .filter(Boolean);

  return employees;
}