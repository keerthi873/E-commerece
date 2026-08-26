import { createFileRoute } from "@tanstack/react-router";
import { ElectronicsSection } from "@/components/store/ElectronicsSection";

export const Route = createFileRoute("/electronics/$type")({
  component: ElectronicsTypeRoute,
});

function ElectronicsTypeRoute() {
  const { type } = Route.useParams();
  return <ElectronicsSection selectedType={type} />;
}
