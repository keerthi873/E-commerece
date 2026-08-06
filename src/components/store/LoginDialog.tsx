import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "./store-context";

export function LoginDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { signIn } = useStore();
  const [phone, setPhone] = React.useState("");
  const valid = /^[6-9]\d{9}$/.test(phone);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Login to Kartly</DialogTitle>
          <DialogDescription>
            Get access to your orders, wishlist and recommendations.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!valid) return;
            signIn(phone);
            setPhone("");
            onOpenChange(false);
          }}
        >
          <input
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 10-digit mobile number"
            aria-label="Mobile number"
            className="w-full border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
          <button
            type="submit"
            disabled={!valid}
            className="w-full bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground disabled:opacity-50"
          >
            Continue
          </button>
          <p className="text-xs text-muted-foreground">
            By continuing you agree to Kartly's Terms of Use and Privacy Policy.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
