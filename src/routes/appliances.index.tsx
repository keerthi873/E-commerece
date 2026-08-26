import { createFileRoute } from "@tanstack/react-router";
import { AppliancesSection } from "@/components/store/AppliancesSection";

export const Route = createFileRoute("/appliances/")({
  component: AppliancesIndexRoute,
});

function AppliancesIndexRoute() {
  return <AppliancesSection />;
}
