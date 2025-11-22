import "dotenv/config";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import z from "zod";
import { CONFIG } from "@school-event/config";
import { createSubmission } from "@school-event/db/functions";
import { sendMessage } from "./telegram";

const joinForm = z.object({
  name: z
    .string()
    .min(1, "Введите имя")
    .max(32, "Максимальная длина имени - 32 символа."),
  grade: z.string().min(1, "Введите класс"),
  mostInterestedIn: z
    .enum(CONFIG.programme.map((item) => item.title))
    .nullable(),
});

const app = new Elysia()
  .use(
    cors({
      origin: process.env.CORS_ORIGIN || "",
      methods: ["GET", "POST", "OPTIONS"],
    }),
  )
  .post(
    "/submit",
    async ({ body }) => {
      await createSubmission(body);
      const messageLines = [
        "Новая отправка формы!",
        "<b>Имя</b>: " + body.name,
        "<b>Класс</b>: " + body.grade,
        "<b>Больше всего заинтересован в</b>: " +
          (body.mostInterestedIn ?? "отсутствует"),
      ];
      console.log(messageLines.join("\n"));
      await sendMessage(messageLines.join("\n"));
    },
    {
      body: joinForm,
    },
  )
  .listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });

export type App = typeof app;
