import { createFileRoute } from "@tanstack/react-router";
import { MobileSection } from "@/components/store/MobileSection";

export const Route = createFileRoute("/mobiles/brand/$brand")({
  component: MobileBrandRoute,
});

function MobileBrandRoute() {
  const { brand } = Route.useParams();
  return <MobileSection selectedBrand={brand} />;
}
