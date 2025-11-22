import { CONFIG } from "@school-event/config";
import { cn } from "@/lib/utils";

export function Programme() {
  return (
    <>
      <div className="text-3xl font-bold mt-8 mb-4">Программа мероприятия</div>
      <div className="flex flex-col items-start place-self-start w-full">
        {CONFIG.programme.map((item, idx) => (
          <div className="flex gap-2 w-full" key={item.title}>
            <div className="flex flex-col gap-0.5 items-center">
              <div
                className={cn(
                  "rounded-full bg-muted size-2 shrink-0 text-xl mt-[calc(1lh/2-0.25rem)]",
                )}
              />
              <div
                className={cn(
                  "h-full w-0.5 bg-muted text-xl",
                  idx !== CONFIG.programme.length - 1 &&
                    "-mb-[calc(1lh/2-0.25rem-0.25rem)]",
                )}
              />
            </div>
            <div className="w-full">
              <div className="flex gap-2 w-full justify-between items-center">
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <div className="text-muted-foreground text-sm tabular-nums">
                  {item.time}
                </div>
              </div>
              <div className="text-muted-foreground text-sm">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
