import { db } from ".";
import { submissionsTable } from "./schema";

export async function createSubmission({
  name,
  grade,
  mostInterestedIn,
}: {
  name: string;
  grade: string;
  mostInterestedIn: string;
}) {
  const [res] = await db
    .insert(submissionsTable)
    .values({
      name,
      grade,
      programmeElement: mostInterestedIn,
    })
    .returning();
}
