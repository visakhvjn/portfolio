/** Map PostgREST / Supabase errors to clearer MCQ setup hints. */
export function formatMcqDbError(message: string): string {
  if (
    message.includes("Could not find the table") &&
    message.includes("quizzes")
  ) {
    return (
      "MCQ Quiz is talking to a Supabase project that has no quiz tables. " +
      "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your MCQ project " +
      "(not Dynamic QR), apply supabase/mcq-quiz/migrations/, redeploy, and restart dev."
    );
  }
  return message;
}
