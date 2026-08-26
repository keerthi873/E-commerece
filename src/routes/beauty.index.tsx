import { createFileRoute } from "@tanstack/react-router";
import { BeautySection } from "@/components/store/BeautySection";

export const Route = createFileRoute("/beauty/")({
  component: BeautyIndexRoute,
});

function BeautyIndexRoute() {
  return <BeautySection />;
}
