import assert from 'node:assert/strict';
import { MCQ_BANK, MCQ_SECTIONS } from '../src/data/mcq';
import { COURSE } from '../src/data/course';
import { WEEK_QUIZZES } from '../src/data/quizzes';

// 1. Verify exact count of 80 MCQs
assert.equal(MCQ_BANK.length, 80, `MCQ_BANK must contain exactly 80 questions, got ${MCQ_BANK.length}`);
assert.equal(MCQ_SECTIONS.length, 7, 'MCQ_SECTIONS must have 7 sections');

// 2. Verify balanced A/B/C/D counts (20 each), max consecutive run <= 2,
//    distinct options, AND option length parity (correct option is never longest outlier)
const counts: Record<'A' | 'B' | 'C' | 'D', number> = { A: 0, B: 0, C: 0, D: 0 };
const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
let runLetter = '';
let runLength = 0;
let maxRunLength = 0;
const lengthViolations: string[] = [];

MCQ_BANK.forEach((item, idx) => {
  assert.equal(item.id, idx + 1, `Expected sequential id ${idx + 1}, got ${item.id}`);
  assert.ok(item.q.length > 0, `Empty question text at id=${item.id}`);
  assert.ok(item.explain.length > 0, `Empty explanation at id=${item.id}`);
  assert.equal(item.options.length, 4, `Expected 4 options at id=${item.id}`);
  assert.equal(new Set(item.options).size, 4, `Duplicate option text in id=${item.id}`);

  const ansIdx = letters.indexOf(item.answer);
  assert.ok(ansIdx >= 0, `Invalid answer letter ${item.answer} at id=${item.id}`);

  const correctLen = item.options[ansIdx].length;
  const otherLens = item.options.filter((_, i) => i !== ansIdx).map((o) => o.length);
  const maxOtherLen = Math.max(...otherLens);
  if (correctLen > maxOtherLen) {
    lengthViolations.push(
      `Q${item.id}: correctLen=${correctLen} > maxOtherLen=${maxOtherLen} ("${item.options[ansIdx]}")`
    );
  }

  counts[item.answer] += 1;

  if (item.answer === runLetter) {
    runLength += 1;
  } else {
    runLetter = item.answer;
    runLength = 1;
  }
  if (runLength > maxRunLength) maxRunLength = runLength;
});

assert.equal(
  lengthViolations.length,
  0,
  `Correct option longer than all distractors in:\n${lengthViolations.join('\n')}`
);
assert.equal(counts.A, 20, `Expected 20 A answers, got ${counts.A}`);
assert.equal(counts.B, 20, `Expected 20 B answers, got ${counts.B}`);
assert.equal(counts.C, 20, `Expected 20 C answers, got ${counts.C}`);
assert.equal(counts.D, 20, `Expected 20 D answers, got ${counts.D}`);
assert.ok(maxRunLength <= 2, `Expected max consecutive identical answers <= 2, got ${maxRunLength}`);

// 3. Verify expanded Dev Tools & Git + Project & Agile theory counts
const gitCount = MCQ_BANK.filter((q) => q.section === 'Dev Tools & Git').length;
const agileCount = MCQ_BANK.filter((q) => q.section === 'Project & Agile Practice').length;
assert.ok(gitCount >= 16, `Expected expanded Dev Tools & Git section (>=16), got ${gitCount}`);
assert.ok(agileCount >= 14, `Expected expanded Project & Agile Practice section (>=14), got ${agileCount}`);

// 4. Verify slide decks (82 slides) and 30 check-yourself MCQs
const published = COURSE.weeks.filter((w) => w.status === 'published');
assert.equal(published.length, 6);
const slideCounts = published.map((w) => w.deck?.slides);
assert.deepEqual(slideCounts, [14, 14, 28, 8, 7, 11]);
assert.equal(
  slideCounts.reduce((acc, n) => acc + (n || 0), 0),
  82
);

const totalQuizQuestions = Object.values(WEEK_QUIZZES).reduce(
  (sum, list) => sum + list.length,
  0
);
assert.equal(totalQuizQuestions, 30);

console.log(
  `✓ All mcq-distribution tests passed: 80 MCQs (20/20/20/20 A-D, max run <= 2, 0 length outliers, Git=${gitCount}, Agile=${agileCount}).`
);
