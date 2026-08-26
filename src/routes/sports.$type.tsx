import { createFileRoute } from "@tanstack/react-router";
import { SportsSection } from "@/components/store/SportsSection";

export const Route = createFileRoute("/sports/$type")({
  component: SportsTypeRoute,
});

function SportsTypeRoute() {
  const { type } = Route.useParams();
  return <SportsSection selectedType={type} />;
}
