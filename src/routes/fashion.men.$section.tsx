import { createFileRoute } from "@tanstack/react-router";
import { FashionSection } from "@/components/store/FashionSection";

export const Route = createFileRoute("/fashion/men/$section")({
  component: MenFashionSectionRoute,
});

function MenFashionSectionRoute() {
  const { section } = Route.useParams();
  return <FashionSection selectedGender="men" selectedSection={section} />;
}
