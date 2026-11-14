import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { MCQ_BANK } from '../src/data/mcq';
import { COURSE } from '../src/data/course';
import { WEEK_QUIZZES } from '../src/data/quizzes';
import { STUDY_NOTES } from '../src/data/notes';

// 1. Verify raw JSON attachment matches src/data/mcq.ts
const jsonPath = path.resolve(
  process.cwd(),
  'public/assets/aistudio/CSE_3100_MCQ_Bank_788df7bb.json'
);
const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const rawQuestions = Array.isArray(raw) ? raw : raw.questions;

assert.equal(MCQ_BANK.length, 100, 'MCQ_BANK must contain exactly 100 questions');
assert.equal(rawQuestions.length, 100, 'Source JSON must contain exactly 100 questions');

// 2. Verify exact option order (no runtime shuffling) and balanced A/B/C/D counts (25 each)
const counts: Record<'A' | 'B' | 'C' | 'D', number> = { A: 0, B: 0, C: 0, D: 0 };
let runLetter = '';
let runLength = 0;
let maxRunLength = 0;

MCQ_BANK.forEach((item, idx) => {
  const src = rawQuestions[idx];
  assert.equal(item.id, src.id, `ID mismatch at index ${idx}`);
  assert.ok(item.q.length > 0, `Empty question text at id=${item.id}`);
  assert.equal(item.q, src.q, `Question text mismatch at id=${item.id}`);
  assert.deepEqual(item.options, src.options, `Options altered/shuffled at id=${item.id}`);
  assert.equal(item.answer, src.answer, `Answer mismatch at id=${item.id}`);

  assert.equal(Object.keys(item.options).length, 4);
  const optValues = Object.values(item.options);
  assert.equal(new Set(optValues).size, 4, `Duplicate option text in id=${item.id}`);

  counts[item.answer] += 1;

  if (item.answer === runLetter) {
    runLength += 1;
  } else {
    runLetter = item.answer;
    runLength = 1;
  }
  if (runLength > maxRunLength) maxRunLength = runLength;
});

assert.equal(counts.A, 25, `Expected 25 A answers, got ${counts.A}`);
assert.equal(counts.B, 25, `Expected 25 B answers, got ${counts.B}`);
assert.equal(counts.C, 25, `Expected 25 C answers, got ${counts.C}`);
assert.equal(counts.D, 25, `Expected 25 D answers, got ${counts.D}`);
assert.ok(maxRunLength <= 2, `Expected max consecutive identical answers <= 2, got ${maxRunLength}`);

// 3. Verify course structure, slide counts (82), notes (6), and week quizzes (30)
assert.equal(COURSE.weeks.length, 14);
const published = COURSE.weeks.filter((w) => w.status === 'published');
assert.equal(published.length, 6);
const slideCounts = published.map((w) => w.deck?.slides);
assert.deepEqual(slideCounts, [14, 14, 28, 8, 7, 11]);
assert.equal(
  slideCounts.reduce((acc, n) => acc + (n || 0), 0),
  82
);
assert.equal(STUDY_NOTES.length, 6);

const totalQuizQuestions = Object.values(WEEK_QUIZZES).reduce(
  (sum, list) => sum + list.length,
  0
);
assert.equal(totalQuizQuestions, 30);

console.log(
  '✓ All mcq-distribution & course-structure tests passed (100 MCQs balanced 25/25/25/25, max run <= 2, 82 slides, 6 notes, 30 check-yourself MCQs).'
);
