"use client";

import { useState } from "react";
import type { Database } from "@/types/database.types";
import ServiceSelector from "./ServiceSelector";
import type { BookingStep } from "@/types/booking";

type Service = Database["public"]["Tables"]["services"]["Row"];

type Props = {
  services: Service[];
};

export default function BookingClient({ services }: Props) {

  const [selectedServiceId, setSelectedServiceId] =
    useState<string | null>(null);

  const [currentStep, setCurrentStep] =
  useState<BookingStep>("SERVICE");

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg">

      <h1 className="mb-6 text-2xl font-bold">
        Reserva tu cita
      </h1>

      <ServiceSelector
        services={services}
        selectedServiceId={selectedServiceId}
        onSelect={setSelectedServiceId}
      />

    </div>
  );
}