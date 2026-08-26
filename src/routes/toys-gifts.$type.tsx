import { createFileRoute } from "@tanstack/react-router";
import { ToysGiftsSection } from "@/components/store/ToysGiftsSection";

export const Route = createFileRoute("/toys-gifts/$type")({
  component: ToysGiftsTypeRoute,
});

function ToysGiftsTypeRoute() {
  const { type } = Route.useParams();
  return <ToysGiftsSection selectedType={type} />;
}
