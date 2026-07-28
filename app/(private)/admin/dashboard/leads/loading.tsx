import { Loader } from "@/components/ui/Loader";

export default function Loading() {
  return (
    <div className="flex h-96 items-center justify-center">
      <Loader size="lg" label="Loading leads..." />
    </div>
  );
}
