import { CONFIG } from "@school-event/config";
import { JoinButton } from "./join-button";

export function CTA() {
  return (
    <div className="flex flex-col gap-4 items-center mt-16">
      <h2 className="font-bold text-4xl">{CONFIG.cta.title}</h2>
      <p className="text-muted-foreground text-center">
        {CONFIG.cta.description}
      </p>
      <JoinButton />
    </div>
  );
}
