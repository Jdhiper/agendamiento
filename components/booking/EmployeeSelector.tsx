"use client";

import { useEffect, useState } from "react";
import type { Database } from "@/types/database.types";

type Employee = Database["public"]["Tables"]["employees"]["Row"];

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
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadEmployees() {
      setLoading(true);

      const response = await fetch(
        `/api/employees?serviceId=${serviceId}`
      );

      if (!response.ok) {
        setEmployees([]);
        setLoading(false);
        return;
      }

      const data: Employee[] = await response.json();

      setEmployees(data);
      setLoading(false);
    }

    loadEmployees();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="mt-6">
        <p className="text-sm text-zinc-500">
          Cargando empleados...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-lg font-semibold">
        Selecciona un empleado
      </h2>

      <div className="space-y-3">
        {employees.map((employee) => (
          <button
            key={employee.id}
            onClick={() => onSelect(employee.id)}
            className={`w-full rounded-xl border p-4 text-left transition ${
              selectedEmployeeId === employee.id
                ? "border-blue-600 bg-blue-50"
                : "border-zinc-200 hover:border-zinc-400"
            }`}
          >
            <div className="font-medium">
              {employee.full_name}
            </div>
          </button>
        ))}

        {!loading && employees.length === 0 && (
          <p className="text-sm text-zinc-500">
            No hay empleados disponibles para este servicio.
          </p>
        )}
      </div>
    </div>
  );
}