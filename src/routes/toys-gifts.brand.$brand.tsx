import { createFileRoute } from "@tanstack/react-router";
import { ToysGiftsSection } from "@/components/store/ToysGiftsSection";

export const Route = createFileRoute("/toys-gifts/brand/$brand")({
  component: ToysGiftsBrandRoute,
});

function ToysGiftsBrandRoute() {
  const { brand } = Route.useParams();
  return <ToysGiftsSection selectedBrand={brand} />;
}
