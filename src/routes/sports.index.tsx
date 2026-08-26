import { createFileRoute } from "@tanstack/react-router";
import { SportsSection } from "@/components/store/SportsSection";

export const Route = createFileRoute("/sports/")({
  component: SportsIndexRoute,
});

function SportsIndexRoute() {
  return <SportsSection />;
}
