import { createFileRoute } from "@tanstack/react-router";
import { ToysGiftsSection } from "@/components/store/ToysGiftsSection";

export const Route = createFileRoute("/toys/$type")({
  component: ToysTypeRoute,
});

function ToysTypeRoute() {
  const { type } = Route.useParams();
  return <ToysGiftsSection selectedType={type} />;
}
