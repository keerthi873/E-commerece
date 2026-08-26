import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/fashion/women")({
  head: () => ({
    meta: [
      { title: "Women's Fashion Store — Dresses, Sarees, Tops & Heels | Kartly" },
      {
        name: "description",
        content: "Shop women's sarees, ethnic wear, western dresses, tops & footwear on Kartly with up to 70% off.",
      },
    ],
  }),
  component: WomenFashionLayout,
});

function WomenFashionLayout() {
  return <Outlet />;
}
