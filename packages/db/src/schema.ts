import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const submissionsTable = sqliteTable("submissions", {
  id: text()
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  name: text().notNull(),
  grade: text().notNull(),
  programmeElement: text(),
});
