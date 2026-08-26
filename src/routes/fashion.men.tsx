import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/fashion/men")({
  head: () => ({
    meta: [
      { title: "Men's Fashion Store — Shirts, Jeans, Grooming & Footwear | Kartly" },
      {
        name: "description",
        content: "Shop men's clothing, footwear, accessories, grooming & sports activewear on Kartly.",
      },
    ],
  }),
  component: MenFashionLayout,
});

function MenFashionLayout() {
  return <Outlet />;
}
