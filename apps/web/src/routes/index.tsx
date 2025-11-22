import { CTA } from "@/components/cta";
import { InfoCard } from "@/components/info-card";
import { JoinButton } from "@/components/join-button";
import { ModeToggle } from "@/components/mode-toggle";
import { People } from "@/components/people";
import { Programme } from "@/components/programme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONFIG } from "@school-event/config";
import { humanReadableDate } from "@/lib/date";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarIcon, ChevronRightIcon, MapPinIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2 flex flex-col items-center">
      <div className="fixed top-2 right-2">
        <ModeToggle />
      </div>
      <div className="h-dvh px-4 flex items-center">
        <div className="flex flex-col items-center">
          <Badge variant="outline">Уже {humanReadableDate(CONFIG.date)}</Badge>
          <h1 className="relative text-6xl md:text-7xl bg-clip-text pb-2 text-transparent bg-linear-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
            {CONFIG.headerTitle}
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto mb-2 text-sm text-center relative">
            {CONFIG.headerDescription}
          </p>
          <JoinButton />
          <div className="flex flex-col gap-2 mt-6">
            <InfoCard icon={MapPinIcon} title="Место" value={CONFIG.place} />
            <InfoCard
              icon={CalendarIcon}
              title="Дата и время"
              value={humanReadableDate(CONFIG.date)}
            />
          </div>
        </div>
      </div>
      <Programme />
      <People />
      <CTA />
    </div>
  );
}
