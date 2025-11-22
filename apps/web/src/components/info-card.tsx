import type { LucideIcon } from "lucide-react";

export function InfoCard({
  icon: Icon,
  title,
  value,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
}) {
  return (
    <div className="flex gap-2 items-center rounded-md border p-4 min-w-80">
      <div className="size-12 flex items-center justify-center rounded-full border text-muted-foreground">
        <Icon className="size-6" />
      </div>
      <div className="flex flex-col leading-tight">
        <div className="text-xs text-muted-foreground">{title}</div>
        <div className="font-bold text-xl">{value}</div>
      </div>
    </div>
  );
}
