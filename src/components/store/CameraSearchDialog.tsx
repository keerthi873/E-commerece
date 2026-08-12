import * as React from "react";
import { Camera, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "./store-context";

export function CameraSearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { setQuery, setCategory } = useStore();
  const [mode, setMode] = React.useState<"select" | "camera">("select");
  const [cameraError, setCameraError] = React.useState<string | null>(null);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  const stopCamera = React.useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setMode("camera");
    } catch (err) {
      console.error(err);
      setCameraError("Permission denied or camera unavailable.");
      toast.error("Permission denied", {
        description: "Could not access camera. Try uploading an image instead.",
      });
    }
  };

  React.useEffect(() => {
    if (!open) {
      stopCamera();
      setMode("select");
      setCameraError(null);
    }
  }, [open, stopCamera]);

  const handleSearchSuccess = (keyword: string) => {
    stopCamera();
    onOpenChange(false);
    setCategory("For You");
    setQuery(keyword);
    toast.success(`Image Search`, {
      description: `Showing products matching "${keyword}"`,
    });
    document
      .getElementById("deals")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSearchSuccess("earbuds");
    }
  };

  const capturePhoto = () => {
    handleSearchSuccess("watch");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Image Search</DialogTitle>
          <DialogDescription>
            Search for products by uploading an image or capturing a photo.
          </DialogDescription>
        </DialogHeader>

        {mode === "select" ? (
          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-center gap-2 w-full border border-border bg-card p-3 text-sm font-semibold cursor-pointer hover:border-brand transition-colors">
              <Upload className="size-4 text-muted-foreground" />
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={startCamera}
              className="flex items-center justify-center gap-2 w-full border border-border bg-card p-3 text-sm font-semibold hover:border-brand transition-colors"
            >
              <Camera className="size-4 text-muted-foreground" />
              <span>Open Camera</span>
            </button>

            {cameraError && (
              <p className="text-xs text-red-600 font-medium">{cameraError}</p>
            )}
          </div>
        ) : (
          <div className="space-y-3 pt-2 text-center">
            <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                playsInline
                muted
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  stopCamera();
                  setMode("select");
                }}
                className="w-1/2 border border-border py-2 text-xs font-semibold"
              >
                Back
              </button>
              <button
                onClick={capturePhoto}
                className="w-1/2 bg-accent text-accent-foreground py-2 text-xs font-bold"
              >
                Capture & Search
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
