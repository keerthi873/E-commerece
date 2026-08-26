import { createFileRoute } from "@tanstack/react-router";
import { ElectronicsSection } from "@/components/store/ElectronicsSection";

export const Route = createFileRoute("/electronics/brand/$brand")({
  component: ElectronicsBrandRoute,
});

function ElectronicsBrandRoute() {
  const { brand } = Route.useParams();
  return <ElectronicsSection selectedBrand={brand} />;
}
