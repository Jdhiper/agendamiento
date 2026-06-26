import { getServices } from "@/lib/booking/getServices";
import BookingClient from "./BookingClient";

export default async function BookingWidget() {
  const services = await getServices();

  return <BookingClient services={services} />;
}