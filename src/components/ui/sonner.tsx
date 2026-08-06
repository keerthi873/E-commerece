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
            "group toast !bg-primary !text-primary-foreground !border !border-accent !border-l-4 !border-l-accent !shadow-xl !rounded-md font-sans tracking-tight",
          description: "group-[.toast]:!text-primary-foreground/75 group-[.toast]:text-sm",
          actionButton:
            "group-[.toast]:!bg-accent group-[.toast]:!text-accent-foreground group-[.toast]:hover:!bg-accent/90 group-[.toast]:font-semibold",
          cancelButton:
            "group-[.toast]:!bg-secondary group-[.toast]:!text-secondary-foreground group-[.toast]:hover:!bg-secondary/80",
          success:
            "group-[.toast]:!bg-primary group-[.toast]:!text-primary-foreground group-[.toast]:!border-l-accent",
          error:
            "group-[.toast]:!bg-primary group-[.toast]:!text-primary-foreground group-[.toast]:!border-l-destructive",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
