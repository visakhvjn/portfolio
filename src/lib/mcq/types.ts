export type QuizRow = {
  id: string;
  owner_id: string;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type QuizQuestionRow = {
  id: string;
  quiz_id: string;
  position: number;
  prompt: string;
  options: string[];
  correct_index: number;
};

export type QuizAttemptRow = {
  id: string;
  quiz_id: string;
  taker_id: string;
  taker_email: string | null;
  score: number;
  total: number;
  created_at: string;
};

export type QuizAnswerRow = {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_index: number;
};
