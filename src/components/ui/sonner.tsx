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
            "group toast group-[.toaster]:bg-primary group-[.toaster]:text-primary-foreground group-[.toaster]:border group-[.toaster]:border-accent group-[.toaster]:border-l-4 group-[.toaster]:border-l-accent group-[.toaster]:shadow-xl group-[.toaster]:rounded-md group-[.toaster]:font-sans group-[.toaster]:tracking-tight",
          description: "group-[.toast]:text-primary-foreground/75 group-[.toast]:text-sm",
          actionButton:
            "group-[.toast]:bg-accent group-[.toast]:text-accent-foreground group-[.toast]:hover:bg-accent/90 group-[.toast]:font-semibold",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.toast]:hover:bg-secondary/80",
          success:
            "group-[.toaster]:bg-primary group-[.toaster]:text-primary-foreground group-[.toaster]:border-l-accent",
          error:
            "group-[.toaster]:bg-primary group-[.toaster]:text-primary-foreground group-[.toaster]:border-l-destructive",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
