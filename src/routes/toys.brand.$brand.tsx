import { createFileRoute } from "@tanstack/react-router";
import { ToysGiftsSection } from "@/components/store/ToysGiftsSection";

export const Route = createFileRoute("/toys/brand/$brand")({
  component: ToysBrandRoute,
});

function ToysBrandRoute() {
  const { brand } = Route.useParams();
  return <ToysGiftsSection selectedBrand={brand} />;
}
