import { createFileRoute } from "@tanstack/react-router";
import { ToysGiftsSection } from "@/components/store/ToysGiftsSection";

export const Route = createFileRoute("/toys-gifts/")({
  component: ToysGiftsIndexRoute,
});

function ToysGiftsIndexRoute() {
  return <ToysGiftsSection />;
}
