import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/furniture")({
  component: FurnitureRedirectRoute,
});

function FurnitureRedirectRoute() {
  return <Navigate to="/" replace />;
}
