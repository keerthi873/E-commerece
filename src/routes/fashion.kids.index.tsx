import { createFileRoute } from "@tanstack/react-router";
import { FashionSection } from "@/components/store/FashionSection";

export const Route = createFileRoute("/fashion/kids/")({
  component: KidsFashionIndexRoute,
});

function KidsFashionIndexRoute() {
  return <FashionSection selectedGender="kids" />;
}
