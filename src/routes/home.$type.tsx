import { createFileRoute } from "@tanstack/react-router";
import { HomeSection } from "@/components/store/HomeSection";

export const Route = createFileRoute("/home/$type")({
  component: HomeTypeRoute,
});

function HomeTypeRoute() {
  const { type } = Route.useParams();
  return <HomeSection selectedType={type} />;
}
