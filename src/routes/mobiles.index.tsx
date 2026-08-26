import { createFileRoute } from "@tanstack/react-router";
import { MobileSection } from "@/components/store/MobileSection";

export const Route = createFileRoute("/mobiles/")({
  component: MobilesIndexRoute,
});

function MobilesIndexRoute() {
  return <MobileSection />;
}
