import type { Database } from "@/types/database.types";

type Service = Database["public"]["Tables"]["services"]["Row"];

type Props = {
  services: Service[];
  selectedServiceId: string | null;
  onSelect: (serviceId: string) => void;
};

export default function ServiceSelector({
  services,
  selectedServiceId,
  onSelect,
}: Props) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">
        Selecciona un servicio
      </h2>

      <div className="space-y-3">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service.id)}
            className={`w-full rounded-xl border p-4 text-left transition ${
              selectedServiceId === service.id
                ? "border-blue-600 bg-blue-50"
                : "border-zinc-200 hover:border-zinc-400"
            }`}
          >
            <div className="font-medium">{service.name}</div>

            <div className="text-sm text-zinc-500">
              {service.duration_minutes} minutos
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}