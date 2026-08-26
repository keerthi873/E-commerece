import { createFileRoute } from "@tanstack/react-router";
import { MobileSection } from "@/components/store/MobileSection";

export const Route = createFileRoute("/mobiles/$type")({
  component: MobileTypeSectionRoute,
});

function MobileTypeSectionRoute() {
  const { type } = Route.useParams();
  return <MobileSection selectedType={type} />;
}
