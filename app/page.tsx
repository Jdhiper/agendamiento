import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: services, error } = await supabase
    .from("services")
    .select("*");

  if (error) {
    return (
      <div className="p-8">
        <h1>Error</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-100 p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">
          Sistema de Agendamiento
        </h1>

        <h2 className="mb-4 text-2xl font-semibold">
          Servicios disponibles
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {services?.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <h3 className="text-xl font-semibold">
                {service.name}
              </h3>

              <p className="text-zinc-600">
                Duración: {service.duration_minutes} min
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}