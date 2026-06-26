import { getEmployeesByService } from "@/lib/booking/getEmployeesByService";
import { getServices } from "@/lib/booking/getServices";
import BookingClient from "./BookingClient";

export default async function BookingWidget() {
  const services = await getServices();

  const employees = await getEmployeesByService(
    "9b28fa4d-2a0e-4e34-96a8-0109744c12b9"
  );

  return (
    <>
      <pre>{JSON.stringify(employees, null, 2)}</pre>

      <BookingClient services={services} />
    </>
  );
}