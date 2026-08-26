import { createFileRoute } from "@tanstack/react-router";
import { HomeSection } from "@/components/store/HomeSection";

export const Route = createFileRoute("/home/")({
  component: HomeIndexRoute,
});

function HomeIndexRoute() {
  return <HomeSection />;
}
