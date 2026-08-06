import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        duration: 2800,
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#0d0d0d] group-[.toaster]:text-[#f5f0e0] group-[.toaster]:border-[#c9a84c] group-[.toaster]:border-l-4 group-[.toaster]:border-l-[#c9a84c] group-[.toaster]:shadow-xl group-[.toaster]:rounded-md group-[.toaster]:font-sans group-[.toaster]:tracking-tight",
          description: "group-[.toast]:text-[#f0d78c]/80 group-[.toast]:text-sm",
          actionButton:
            "group-[.toast]:bg-[#c9a84c] group-[.toast]:text-[#0d0d0d] group-[.toast]:hover:bg-[#f0d78c] group-[.toast]:font-semibold",
          cancelButton:
            "group-[.toast]:bg-[#1a1a1a] group-[.toast]:text-[#f5f0e0] group-[.toast]:hover:bg-[#2d2d2d]",
          success:
            "group-[.toaster]:bg-[#0d0d0d] group-[.toaster]:text-[#f5f0e0] group-[.toaster]:border-l-[#c9a84c]",
          error:
            "group-[.toaster]:bg-[#0d0d0d] group-[.toaster]:text-[#f5f0e0] group-[.toaster]:border-l-[#e85d3a]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
