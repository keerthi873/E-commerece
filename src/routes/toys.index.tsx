import { createFileRoute } from "@tanstack/react-router";
import { ToysGiftsSection } from "@/components/store/ToysGiftsSection";

export const Route = createFileRoute("/toys/")({
  component: ToysIndexRoute,
});

function ToysIndexRoute() {
  return <ToysGiftsSection />;
}
