-- MCQ Quiz Maker — run in Supabase SQL editor
-- Tables + RLS for quizzes, questions, attempts, answers

create extension if not exists "pgcrypto";

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists quizzes_owner_id_idx on public.quizzes (owner_id);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes (id) on delete cascade,
  position int not null,
  prompt text not null,
  options jsonb not null,
  correct_index int not null,
  constraint quiz_questions_correct_index_check check (correct_index >= 0)
);

create index if not exists quiz_questions_quiz_id_idx on public.quiz_questions (quiz_id);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes (id) on delete cascade,
  taker_id uuid not null references auth.users (id) on delete cascade,
  taker_email text,
  score int not null,
  total int not null,
  created_at timestamptz not null default now()
);

create index if not exists quiz_attempts_quiz_id_idx on public.quiz_attempts (quiz_id);
create index if not exists quiz_attempts_taker_id_idx on public.quiz_attempts (taker_id);

create table if not exists public.quiz_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.quiz_attempts (id) on delete cascade,
  question_id uuid not null references public.quiz_questions (id) on delete cascade,
  selected_index int not null
);

create index if not exists quiz_answers_attempt_id_idx on public.quiz_answers (attempt_id);

alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.quiz_answers enable row level security;

-- Quizzes
create policy "Owners can manage own quizzes"
  on public.quizzes
  for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "Authenticated users can read quizzes to take them"
  on public.quizzes
  for select
  to authenticated
  using (true);

-- Questions
create policy "Owners can manage questions on own quizzes"
  on public.quiz_questions
  for all
  using (
    exists (
      select 1 from public.quizzes q
      where q.id = quiz_id and q.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.quizzes q
      where q.id = quiz_id and q.owner_id = auth.uid()
    )
  );

create policy "Authenticated users can read questions"
  on public.quiz_questions
  for select
  to authenticated
  using (true);

-- Attempts
create policy "Takers can insert own attempts"
  on public.quiz_attempts
  for insert
  to authenticated
  with check (auth.uid() = taker_id);

create policy "Takers can read own attempts"
  on public.quiz_attempts
  for select
  to authenticated
  using (auth.uid() = taker_id);

create policy "Owners can read attempts on own quizzes"
  on public.quiz_attempts
  for select
  to authenticated
  using (
    exists (
      select 1 from public.quizzes q
      where q.id = quiz_id and q.owner_id = auth.uid()
    )
  );

-- Answers
create policy "Takers can insert answers on own attempts"
  on public.quiz_answers
  for insert
  to authenticated
  with check (
    exists (
      select 1 from public.quiz_attempts a
      where a.id = attempt_id and a.taker_id = auth.uid()
    )
  );

create policy "Takers can read own answers"
  on public.quiz_answers
  for select
  to authenticated
  using (
    exists (
      select 1 from public.quiz_attempts a
      where a.id = attempt_id and a.taker_id = auth.uid()
    )
  );

create policy "Owners can read answers on own quizzes"
  on public.quiz_answers
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.quiz_attempts a
      join public.quizzes q on q.id = a.quiz_id
      where a.id = attempt_id and q.owner_id = auth.uid()
    )
  );
