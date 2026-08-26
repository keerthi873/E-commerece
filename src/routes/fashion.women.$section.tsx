import { createFileRoute } from "@tanstack/react-router";
import { FashionSection } from "@/components/store/FashionSection";

export const Route = createFileRoute("/fashion/women/$section")({
  component: WomenFashionSectionRoute,
});

function WomenFashionSectionRoute() {
  const { section } = Route.useParams();
  return <FashionSection selectedGender="women" selectedSection={section} />;
}
