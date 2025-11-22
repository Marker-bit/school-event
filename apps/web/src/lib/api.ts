import { treaty } from "@elysiajs/eden";
import type { App } from "@school-event/server";

export const client = treaty<App>(import.meta.env.VITE_SERVER_URL!);
