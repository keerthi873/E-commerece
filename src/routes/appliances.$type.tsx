import { createFileRoute } from "@tanstack/react-router";
import { AppliancesSection } from "@/components/store/AppliancesSection";

export const Route = createFileRoute("/appliances/$type")({
  component: AppliancesTypeRoute,
});

function AppliancesTypeRoute() {
  const { type } = Route.useParams();
  return <AppliancesSection selectedType={type} />;
}
