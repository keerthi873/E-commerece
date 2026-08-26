import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/fashion/kids")({
  head: () => ({
    meta: [
      { title: "Kids' Fashion Store — Frocks, Rompers & Playwear | Kartly" },
      {
        name: "description",
        content: "Shop kids' frocks, rompers, t-shirts, boys & girls apparel on Kartly with up to 70% off.",
      },
    ],
  }),
  component: KidsFashionLayout,
});

function KidsFashionLayout() {
  return <Outlet />;
}
