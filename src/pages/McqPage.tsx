import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  XCircle,
  Bookmark,
  Flag,
  Eye,
  Shuffle,
  Printer,
  Copy,
  Check,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Mail,
} from 'lucide-react';
import { CLUSTERS } from '../data/course';
import { MCQ_BANK, MCQ_SECTIONS, type McqItem } from '../data/mcq';
import type { BookmarkItem, StudyProgressState } from '../state/useStudyStore';

interface McqPageProps {
  state: StudyProgressState;
  onSetMode: (mode: 'end' | 'immediate') => void;
  onToggleFlag: (id: number) => void;
  onRecordAttempt: (
    score: number,
    total: number,
    wrongIds: number[],
    sectionBreakdown: Record<string, { correct: number; total: number }>
  ) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (item: BookmarkItem) => void;
}

const LETTERS: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

export const McqPage: React.FC<McqPageProps> = ({
  state,
  onSetMode,
  onToggleFlag,
  onRecordAttempt,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [lengthLimit, setLengthLimit] = useState<10 | 25 | 50 | 100>(100);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(1);
  const [onlyUnanswered, setOnlyUnanswered] = useState(false);
  const [retryWrongOnly, setRetryWrongOnly] = useState(false);

  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealedIds, setRevealedIds] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [copiedKey, setCopiedKey] = useState(false);
  const [showAnswerKeyModal, setShowAnswerKeyModal] = useState(false);

  // Build active question deck (NEVER shuffle options!)
  const activeDeck = useMemo<McqItem[]>(() => {
    let list = [...MCQ_BANK];
    if (retryWrongOnly && state.mcq.lastWrongIds.length > 0) {
      list = list.filter((q) => state.mcq.lastWrongIds.includes(q.id));
    }
    if (sectionFilter !== 'all') {
      list = list.filter((q) => q.section === sectionFilter);
    }
    if (onlyUnanswered) {
      list = list.filter((q) => !answers[q.id]);
    }
    if (shuffleQuestions) {
      // Deterministic Fisher-Yates using shuffleSeed
      let s = shuffleSeed;
      const rand = () => {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
      };
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
    return list.slice(0, lengthLimit);
  }, [
    sectionFilter,
    lengthLimit,
    shuffleQuestions,
    shuffleSeed,
    onlyUnanswered,
    retryWrongOnly,
    state.mcq.lastWrongIds,
    answers,
  ]);

  const safeIdx = Math.min(currentIdx, Math.max(0, activeDeck.length - 1));
  const currentQ = activeDeck[safeIdx];

  const selectOption = useCallback(
    (qId: number, letter: 'A' | 'B' | 'C' | 'D') => {
      if (submitted && state.mcq.mode === 'end') return;
      setAnswers((prev) => ({ ...prev, [qId]: letter }));
      if (state.mcq.mode === 'immediate') {
        setRevealedIds((prev) => ({ ...prev, [qId]: true }));
      }
    },
    [submitted, state.mcq.mode]
  );

  // Keyboard shortcuts: A-D or 1-4 select, Enter next, ArrowLeft/Right prev/next
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!currentQ) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
        return;
      }
      const k = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(k)) {
        selectOption(currentQ.id, k as 'A' | 'B' | 'C' | 'D');
      } else if (['1', '2', '3', '4'].includes(k)) {
        selectOption(currentQ.id, LETTERS[Number(k) - 1]);
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (safeIdx < activeDeck.length - 1) setCurrentIdx(safeIdx + 1);
      } else if (e.key === 'ArrowLeft') {
        if (safeIdx > 0) setCurrentIdx(safeIdx - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentQ, safeIdx, activeDeck.length, selectOption]);

  const handleSubmitAll = () => {
    let score = 0;
    const wrongIds: number[] = [];
    const breakdown: Record<string, { correct: number; total: number }> = {};
    activeDeck.forEach((q) => {
      if (!breakdown[q.section]) breakdown[q.section] = { correct: 0, total: 0 };
      breakdown[q.section].total += 1;
      if (answers[q.id] === q.answer) {
        score += 1;
        breakdown[q.section].correct += 1;
      } else {
        wrongIds.push(q.id);
      }
    });
    setSubmitted(true);
    onRecordAttempt(score, activeDeck.length, wrongIds, breakdown);
  };

  const resetSession = () => {
    setAnswers({});
    setRevealedIds({});
    setSubmitted(false);
    setCurrentIdx(0);
  };

  const handleCopyAnswerKey = async () => {
    const text = activeDeck.map((q) => `Q${q.id} → ${q.answer}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 1800);
    } catch {
      // Ignore
    }
  };

  const weakestSection = useMemo<{ name: string; pct: number } | null>(() => {
    let worst: { name: string; pct: number } | null = null;
    for (const [name, tot] of Object.entries(state.mcq.sectionTotal)) {
      if (!tot) continue;
      const pct = Math.round(((state.mcq.sectionCorrect[name] || 0) / tot) * 100);
      if (!worst || pct < worst.pct) worst = { name, pct };
    }
    return worst;
  }, [state.mcq.sectionCorrect, state.mcq.sectionTotal]);

  const sectionBreakdownResults = useMemo(() => {
    const map: Record<string, { correct: number; total: number }> = {};
    activeDeck.forEach((q) => {
      if (!map[q.section]) map[q.section] = { correct: 0, total: 0 };
      map[q.section].total += 1;
      if (answers[q.id] === q.answer) map[q.section].correct += 1;
    });
    return map;
  }, [activeDeck, answers]);

  const totalCorrectInDeck = activeDeck.filter((q) => answers[q.id] === q.answer).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs font-semibold text-[var(--primary)] uppercase tracking-wide">
            PRACTICE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mt-1">
            MCQ Practice
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1 max-w-2xl">
            100 questions on Flutter, Dart, REST APIs, maps, developer tools, Git and project practices.
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] font-mono text-xs font-bold tabular-nums">
          {MCQ_BANK.length} Questions
        </span>
      </div>

      {/* Mode Switch + Stats Bar */}
      <div className="no-print portal-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
          <button
            type="button"
            onClick={() => onSetMode('end')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              state.mcq.mode === 'end'
                ? 'bg-[var(--surface)] text-[var(--primary)] shadow-xs'
                : 'text-[var(--text-muted)]'
            }`}
          >
            Show answers at the end
          </button>
          <button
            type="button"
            onClick={() => onSetMode('immediate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              state.mcq.mode === 'immediate'
                ? 'bg-[var(--surface)] text-[var(--primary)] shadow-xs'
                : 'text-[var(--text-muted)]'
            }`}
          >
            Show answer after each question
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          {state.mcq.bestScore !== null && (
            <span>
              Best: <strong className="text-[var(--success)] tabular-nums">{state.mcq.bestScore}/{state.mcq.bestTotal}</strong>
            </span>
          )}
          <span>
            Attempts: <strong className="tabular-nums">{state.mcq.attempts}</strong>
          </span>
          {weakestSection && (
            <span className="text-[var(--warning)]">
              Weakest: <strong>{weakestSection.name} ({weakestSection.pct}%)</strong>
            </span>
          )}
        </div>
      </div>

      {/* Filters & Setup */}
      <div className="no-print portal-card rounded-2xl p-4 space-y-3 text-xs">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => {
              setSectionFilter('all');
              setCurrentIdx(0);
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold border ${
              sectionFilter === 'all'
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
            }`}
          >
            All Sections (100)
          </button>
          {MCQ_SECTIONS.map((sec) => {
            const cluster = CLUSTERS[sec.cluster];
            const active = sectionFilter === sec.name;
            return (
              <button
                key={sec.name}
                type="button"
                onClick={() => {
                  setSectionFilter(sec.name);
                  setCurrentIdx(0);
                }}
                className="px-3 py-1.5 rounded-lg font-semibold border transition-colors"
                style={{
                  borderColor: active ? `var(${cluster.colorVar})` : 'var(--border)',
                  backgroundColor: active
                    ? `color-mix(in srgb, var(${cluster.colorVar}) 14%, transparent)`
                    : 'var(--surface)',
                  color: active ? `var(${cluster.colorVar})` : 'var(--text-muted)',
                }}
              >
                {sec.name}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border)]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[var(--text-muted)]">Length:</span>
            {([10, 25, 50, 100] as const).map((len) => (
              <button
                key={len}
                type="button"
                onClick={() => {
                  setLengthLimit(len);
                  setCurrentIdx(0);
                }}
                className={`px-2.5 py-1 rounded-lg font-mono font-semibold border ${
                  lengthLimit === len
                    ? 'bg-[var(--primary-soft)] text-[var(--primary)] border-[var(--primary)]'
                    : 'bg-[var(--surface)] border-[var(--border)]'
                }`}
              >
                {len === 100 ? 'All 100' : len}
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                setShuffleQuestions((s) => !s);
                setShuffleSeed((n) => n + 1);
                setCurrentIdx(0);
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border font-semibold ${
                shuffleQuestions
                  ? 'bg-[var(--primary-soft)] text-[var(--primary)] border-[var(--primary)]'
                  : 'bg-[var(--surface)] border-[var(--border)]'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              {shuffleQuestions ? 'Shuffled order' : 'Ordered'}
            </button>

            <label className="flex items-center gap-1.5 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={onlyUnanswered}
                onChange={(e) => {
                  setOnlyUnanswered(e.target.checked);
                  setCurrentIdx(0);
                }}
                className="accent-[var(--primary)]"
              />
              Unanswered only
            </label>

            {state.mcq.lastWrongIds.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setRetryWrongOnly((r) => !r);
                  setSubmitted(false);
                  setCurrentIdx(0);
                }}
                className={`px-2.5 py-1 rounded-lg border font-semibold ${
                  retryWrongOnly
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'border-amber-500/40 bg-[var(--state-warn)] text-[var(--warning)]'
                }`}
              >
                Retry wrong ({state.mcq.lastWrongIds.length})
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyAnswerKey}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] font-semibold"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey ? 'Copied Key' : 'Copy Answer Key'}
            </button>
            <button
              type="button"
              onClick={() => setShowAnswerKeyModal((v) => !v)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] font-semibold"
            >
              <Eye className="w-3.5 h-3.5" />
              Answer Key
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              type="button"
              onClick={resetSession}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Submitted Results Summary */}
      {submitted && (
        <section className="portal-card rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs font-bold uppercase text-[var(--primary)]">
                Session Complete
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tabular-nums text-[var(--text)] mt-0.5">
                Score: {totalCorrectInDeck} / {activeDeck.length} (
                {activeDeck.length > 0
                  ? Math.round((totalCorrectInDeck / activeDeck.length) * 100)
                  : 0}
                %)
              </h2>
            </div>
            <button
              type="button"
              onClick={resetSession}
              className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold"
            >
              Start New Attempt
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {Object.entries(sectionBreakdownResults).map(([sec, val]) => (
              <div key={sec} className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 text-xs">
                <div className="font-bold text-[var(--text)] truncate">{sec}</div>
                <div className="font-mono text-sm font-bold text-[var(--primary)] tabular-nums mt-1">
                  {val.correct} / {val.total}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Question Stage + Navigator Grid */}
      {currentQ ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Active Question Card */}
          <div className="lg:col-span-8 portal-card rounded-2xl p-5 sm:p-7 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="font-bold text-[var(--primary)]">
                  #{safeIdx + 1} of {activeDeck.length}
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)] font-bold">
                  Q{currentQ.id}
                </span>
                <span className="text-[var(--text-muted)]">· {currentQ.section}</span>
              </div>

              <div className="no-print flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onToggleFlag(currentQ.id)}
                  aria-label="Flag question"
                  className={`p-2 rounded-lg border text-xs ${
                    state.mcq.flaggedIds.includes(currentQ.id)
                      ? 'border-amber-400 bg-amber-500/15 text-amber-600 dark:text-amber-300'
                      : 'border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onToggleBookmark({
                      id: `mcq-${currentQ.id}`,
                      kind: 'mcq',
                      title: `Q${currentQ.id}: ${currentQ.q}`,
                      subtitle: currentQ.section,
                      route: '/mcq',
                    })
                  }
                  aria-label="Bookmark question"
                  className={`p-2 rounded-lg border text-xs ${
                    isBookmarked(`mcq-${currentQ.id}`)
                      ? 'border-amber-400 bg-amber-500/15 text-amber-600 dark:text-amber-300'
                      : 'border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  <Bookmark
                    className="w-3.5 h-3.5"
                    fill={isBookmarked(`mcq-${currentQ.id}`) ? 'currentColor' : 'none'}
                  />
                </button>
                <a
                  href={`mailto:trofder@baust.edu.bd?subject=${encodeURIComponent(
                    `CSE 3100 MCQ Q${currentQ.id} Issue Report`
                  )}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Report</span>
                </a>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] leading-snug">
              {currentQ.q}
            </h2>

            {/* Options (NEVER shuffled!) */}
            <div role="radiogroup" aria-label={`Options for Question ${currentQ.id}`} className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const letter = LETTERS[idx];
                const picked = answers[currentQ.id] === letter;
                const isRevealed =
                  (state.mcq.mode === 'immediate' && revealedIds[currentQ.id]) || submitted;
                const isCorrectOpt = currentQ.answer === letter;

                let styleCls =
                  'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]';
                if (isRevealed) {
                  if (isCorrectOpt) {
                    styleCls =
                      'border-emerald-500 bg-[var(--state-ok)] text-[var(--success)] font-semibold';
                  } else if (picked) {
                    styleCls = 'border-red-500 bg-[var(--state-bad)] text-[var(--danger)]';
                  }
                } else if (picked) {
                  styleCls =
                    'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)] font-semibold';
                }

                return (
                  <button
                    key={letter}
                    type="button"
                    role="radio"
                    aria-checked={picked}
                    onClick={() => selectOption(currentQ.id, letter)}
                    className={`w-full min-h-[48px] flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-colors ${styleCls}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold shrink-0">{letter})</span>
                      <span>{opt}</span>
                    </div>
                    {isRevealed && isCorrectOpt && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </span>
                    )}
                    {isRevealed && picked && !isCorrectOpt && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold shrink-0">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Immediate Reveal Explanation */}
            {((state.mcq.mode === 'immediate' && revealedIds[currentQ.id]) || submitted) && (
              <div
                aria-live="polite"
                className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/70 text-xs sm:text-sm"
              >
                <strong className="font-mono text-[var(--primary)] mr-1.5">
                  Answer {currentQ.answer}:
                </strong>
                {currentQ.explain}
              </div>
            )}

            {/* Navigation & Submit Bar */}
            <div className="no-print pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safeIdx === 0}
                  onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  type="button"
                  disabled={safeIdx >= activeDeck.length - 1}
                  onClick={() => setCurrentIdx((i) => Math.min(activeDeck.length - 1, i + 1))}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold disabled:opacity-40"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {state.mcq.mode === 'immediate' && !revealedIds[currentQ.id] && (
                  <button
                    type="button"
                    onClick={() => setRevealedIds((p) => ({ ...p, [currentQ.id]: true }))}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold"
                  >
                    <Eye className="w-3.5 h-3.5" /> Show answer
                  </button>
                )}
                {state.mcq.mode === 'end' && !submitted && (
                  <button
                    type="button"
                    onClick={handleSubmitAll}
                    className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:opacity-90"
                  >
                    Submit ({Object.keys(answers).length}/{activeDeck.length} answered)
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 100-Square Navigator Grid */}
          <aside className="no-print lg:col-span-4 portal-card rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--text)]">Question Navigator</span>
              <span className="font-mono text-[var(--text-muted)] tabular-nums">
                {Object.keys(answers).length}/{activeDeck.length}
              </span>
            </div>
            <div className="grid grid-cols-10 gap-1">
              {activeDeck.map((q, idx) => {
                const isCurr = idx === safeIdx;
                const answered = Boolean(answers[q.id]);
                const flagged = state.mcq.flaggedIds.includes(q.id);
                const revealed =
                  submitted || (state.mcq.mode === 'immediate' && revealedIds[q.id]);
                const correct = answers[q.id] === q.answer;

                let cellCls = 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-muted)]';
                if (revealed && answered) {
                  cellCls = correct
                    ? 'border-emerald-500 bg-[var(--state-ok)] text-[var(--success)] font-bold'
                    : 'border-red-500 bg-[var(--state-bad)] text-[var(--danger)] font-bold';
                } else if (answered) {
                  cellCls = 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)] font-bold';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    title={`Q${q.id}`}
                    className={`relative h-7 rounded-md border font-mono text-[10px] tabular-nums flex items-center justify-center ${cellCls} ${
                      isCurr ? 'ring-2 ring-[var(--primary)]' : ''
                    }`}
                  >
                    {idx + 1}
                    {flagged && (
                      <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] font-mono">
              Keys: A–D / 1–4 select · ← / → / Enter navigate
            </div>
          </aside>
        </div>
      ) : (
        <div className="portal-card rounded-2xl p-8 text-center text-sm text-[var(--text-muted)]">
          No questions match the current filters.
        </div>
      )}

      {/* Optional Answer Key View */}
      {showAnswerKeyModal && (
        <section className="portal-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[var(--text)]">Answer Key</h2>
            <button
              type="button"
              onClick={() => setShowAnswerKeyModal(false)}
              className="text-xs font-semibold text-[var(--primary)]"
            >
              Hide
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2 font-mono text-xs tabular-nums">
            {activeDeck.map((q) => (
              <div key={q.id} className="p-2 rounded-lg bg-[var(--surface-2)] text-center">
                Q{q.id}: <strong>{q.answer}</strong>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
