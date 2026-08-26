import { createFileRoute } from "@tanstack/react-router";
import { ElectronicsSection } from "@/components/store/ElectronicsSection";

export const Route = createFileRoute("/electronics/")({
  component: ElectronicsIndexRoute,
});

function ElectronicsIndexRoute() {
  return <ElectronicsSection />;
}
