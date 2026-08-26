import { createFileRoute } from "@tanstack/react-router";
import { FashionSection } from "@/components/store/FashionSection";

export const Route = createFileRoute("/fashion/kids/$section")({
  component: KidsFashionSectionRoute,
});

function KidsFashionSectionRoute() {
  const { section } = Route.useParams();
  return <FashionSection selectedGender="kids" selectedSection={section} />;
}
