"use client";

import { useState } from "react";
import type { Database } from "@/types/database.types";
import ServiceSelector from "./ServiceSelector";
import type { BookingStep } from "@/types/booking";
import EmployeeSelector from "./EmployeeSelector";

type Service = Database["public"]["Tables"]["services"]["Row"];

type Props = {
  services: Service[];
};

export default function BookingClient({ services }: Props) {

  const [currentStep, setCurrentStep] =
  useState<BookingStep>("SERVICE");

    const [booking, setBooking] = useState({
    serviceId: null as string | null,
    employeeId: null as string | null,
    date: null as string | null,
    time: null as string | null,
  });

  function handleServiceSelect(serviceId: string) {
  setBooking((prev) => ({
    ...prev,
    serviceId,
  }));

  setCurrentStep("EMPLOYEE");
  }

  return (
    <div className="w-full max-w-lg rounded-2xl border border-zinc-700 bg-zinc-900 p-8 shadow-2xl">

      <h1 className="mb-6 text-3xl font-bold text-white">
        Reserva tu cita
      </h1>

    <ServiceSelector
      services={services}
      selectedServiceId={booking.serviceId}
      onSelect={handleServiceSelect}
    />

    {booking.serviceId && (
      <EmployeeSelector
        serviceId={booking.serviceId}
        selectedEmployeeId={booking.employeeId}
        onSelect={(employeeId) =>
          setBooking((prev) => ({
          ...prev,
          employeeId,
        }))
      }
    />
)}

    <p className="w-full rounded-xl p-4 text-left">
  Servicio seleccionado: {booking.serviceId ?? "Ninguno"}
</p>

<p className="text-sm text-zinc-500">
  Paso actual: {currentStep}
</p>
    </div>
  );
  
}