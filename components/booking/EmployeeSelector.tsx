import type { Database } from "@/types/database.types";

type Service = Database["public"]["Tables"]["employees"]["Row"];

type Props = {
  serviceId: string;
  selectedEmployeeId: string | null;
  onSelect: (employeeId: string) => void;
};

export default function EmployeeSelector({
  serviceId,
  selectedEmployeeId,
  onSelect,
}: Props) { 


}