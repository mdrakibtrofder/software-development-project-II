import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  XCircle,
  Bookmark,
  Flag,
  Eye,
  EyeOff,
  Shuffle,
  Printer,
  Copy,
  Check,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Mail,
  ListChecks,
  BookOpen,
  Clock,
  Search,
  X,
  Play,
  Pause,
  Award,
} from 'lucide-react';
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

type McqViewMode = 'overview' | 'practice' | 'exam';
type ReviewFilter = 'all' | 'wrong' | 'flagged' | 'correct';

const LETTERS: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

const SECTION_WEEK_MAP: Record<string, string> = Object.fromEntries(
  MCQ_SECTIONS.map((s) => [s.name, s.name === 'Project & Agile Practice' ? 'Weeks 1, 2, 4, 6' : `Week ${s.week}`])
);

const SECTION_COUNTS: Record<string, number> = MCQ_BANK.reduce<Record<string, number>>((acc, q) => {
  acc[q.section] = (acc[q.section] || 0) + 1;
  return acc;
}, {});

function formatTimer(seconds: number): string {
  const safe = Math.max(0, seconds);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const McqPage: React.FC<McqPageProps> = ({
  state,
  onSetMode,
  onToggleFlag,
  onRecordAttempt,
  isBookmarked,
  onToggleBookmark,
}) => {
  // Three distinct tabs/modes — Quick Overview is Default
  const [viewMode, setViewMode] = useState<McqViewMode>('overview');

  // Shared section filter
  const [sectionFilter, setSectionFilter] = useState<string>('all');

  // Quick Overview state: all answers & explanations visible by default
  const [overviewSearch, setOverviewSearch] = useState('');
  const [hiddenOverviewIds, setHiddenOverviewIds] = useState<Record<number, boolean>>({});

  // Practice & Exam shared deck options
  const [lengthLimit, setLengthLimit] = useState<10 | 25 | 50 | 100>(100);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(1);
  const [retryWrongOnly, setRetryWrongOnly] = useState(false);

  // Practice Mode state (self-paced, instant feedback)
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [practiceRevealed, setPracticeRevealed] = useState<Record<number, boolean>>({});
  const [practiceIdx, setPracticeIdx] = useState(0);

  // Exam Mode state (timed, hidden answers during attempt, final scorecard + review)
  const [examAnswers, setExamAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examIdx, setExamIdx] = useState(0);
  const [examTotalSeconds, setExamTotalSeconds] = useState(MCQ_BANK.length * 60);
  const [examSecondsLeft, setExamSecondsLeft] = useState(MCQ_BANK.length * 60);
  const [examPaused, setExamPaused] = useState(false);
  const [examReviewFilter, setExamReviewFilter] = useState<ReviewFilter>('all');
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Overview filtered list (respects section filter + search query)
  const overviewList = useMemo<McqItem[]>(() => {
    const qLower = overviewSearch.trim().toLowerCase();
    return MCQ_BANK.filter((item) => {
      if (sectionFilter !== 'all' && item.section !== sectionFilter) return false;
      if (!qLower) return true;
      const haystack = `q${item.id} ${item.section} ${item.q} ${item.options.join(' ')} ${item.explain}`.toLowerCase();
      return haystack.includes(qLower);
    });
  }, [sectionFilter, overviewSearch]);

  // Active deck for Practice & Exam modes (NEVER shuffles options!)
  const interactiveDeck = useMemo<McqItem[]>(() => {
    let list = [...MCQ_BANK];
    if (retryWrongOnly && state.mcq.lastWrongIds.length > 0) {
      list = list.filter((q) => state.mcq.lastWrongIds.includes(q.id));
    }
    if (sectionFilter !== 'all') {
      list = list.filter((q) => q.section === sectionFilter);
    }
    if (shuffleQuestions) {
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
  }, [sectionFilter, lengthLimit, shuffleQuestions, shuffleSeed, retryWrongOnly, state.mcq.lastWrongIds]);

  // Reset exam timer when deck length changes while in exam or starting fresh
  const resetExamSession = useCallback(
    (nextDeckLen?: number) => {
      const targetLen = nextDeckLen ?? interactiveDeck.length;
      const secs = Math.max(60, targetLen * 60);
      setExamAnswers({});
      setExamSubmitted(false);
      setExamIdx(0);
      setExamTotalSeconds(secs);
      setExamSecondsLeft(secs);
      setExamPaused(false);
      setExamReviewFilter('all');
    },
    [interactiveDeck.length]
  );

  // Sync underlying store mode preference when switching between Practice and Exam
  const switchMode = (next: McqViewMode) => {
    setViewMode(next);
    if (next === 'practice') {
      onSetMode('immediate');
    } else if (next === 'exam') {
      onSetMode('end');
      if (!examSubmitted && Object.keys(examAnswers).length === 0) {
        const secs = Math.max(60, interactiveDeck.length * 60);
        setExamTotalSeconds(secs);
        setExamSecondsLeft(secs);
        setExamPaused(false);
      }
    }
  };

  // Submit Exam handler
  const handleSubmitExam = useCallback(() => {
    if (examSubmitted) return;
    let score = 0;
    const wrongIds: number[] = [];
    const breakdown: Record<string, { correct: number; total: number }> = {};
    interactiveDeck.forEach((q) => {
      if (!breakdown[q.section]) breakdown[q.section] = { correct: 0, total: 0 };
      breakdown[q.section].total += 1;
      if (examAnswers[q.id] === q.answer) {
        score += 1;
        breakdown[q.section].correct += 1;
      } else {
        wrongIds.push(q.id);
      }
    });
    setExamSubmitted(true);
    setExamPaused(true);
    onRecordAttempt(score, interactiveDeck.length, wrongIds, breakdown);
  }, [examSubmitted, interactiveDeck, examAnswers, onRecordAttempt]);

  // Countdown timer for Exam Mode
  useEffect(() => {
    if (viewMode !== 'exam' || examSubmitted || examPaused || interactiveDeck.length === 0) {
      return;
    }
    const timer = window.setInterval(() => {
      setExamSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [viewMode, examSubmitted, examPaused, interactiveDeck.length]);

  // Auto-submit if countdown reaches 0
  useEffect(() => {
    if (viewMode === 'exam' && !examSubmitted && examSecondsLeft === 0 && interactiveDeck.length > 0) {
      handleSubmitExam();
    }
  }, [viewMode, examSubmitted, examSecondsLeft, interactiveDeck.length, handleSubmitExam]);

  // Keep exam timer synced when filters change before answers are entered
  useEffect(() => {
    if (!examSubmitted && Object.keys(examAnswers).length === 0) {
      const secs = Math.max(60, interactiveDeck.length * 60);
      setExamTotalSeconds(secs);
      setExamSecondsLeft(secs);
    }
  }, [interactiveDeck.length, examSubmitted, examAnswers]);

  // Active indices & items for Practice & Exam
  const safePracticeIdx = Math.min(practiceIdx, Math.max(0, interactiveDeck.length - 1));
  const currentPracticeQ = interactiveDeck[safePracticeIdx];

  const safeExamIdx = Math.min(examIdx, Math.max(0, interactiveDeck.length - 1));
  const currentExamQ = interactiveDeck[safeExamIdx];

  const selectPracticeOption = useCallback((qId: number, letter: 'A' | 'B' | 'C' | 'D') => {
    setPracticeAnswers((prev) => ({ ...prev, [qId]: letter }));
    setPracticeRevealed((prev) => ({ ...prev, [qId]: true }));
  }, []);

  const selectExamOption = useCallback(
    (qId: number, letter: 'A' | 'B' | 'C' | 'D') => {
      if (examSubmitted) return;
      setExamAnswers((prev) => ({ ...prev, [qId]: letter }));
    },
    [examSubmitted]
  );

  // Keyboard shortcuts in Practice & Exam modes
  useEffect(() => {
    if (viewMode === 'overview') return;
    const activeQ = viewMode === 'practice' ? currentPracticeQ : currentExamQ;
    const activeIdx = viewMode === 'practice' ? safePracticeIdx : safeExamIdx;
    const setActiveIdx = viewMode === 'practice' ? setPracticeIdx : setExamIdx;

    const onKey = (e: KeyboardEvent) => {
      if (!activeQ) return;
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (viewMode === 'exam' && examSubmitted) return;

      const k = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(k)) {
        if (viewMode === 'practice') {
          selectPracticeOption(activeQ.id, k as 'A' | 'B' | 'C' | 'D');
        } else {
          selectExamOption(activeQ.id, k as 'A' | 'B' | 'C' | 'D');
        }
      } else if (['1', '2', '3', '4'].includes(k)) {
        const letter = LETTERS[Number(k) - 1];
        if (viewMode === 'practice') {
          selectPracticeOption(activeQ.id, letter);
        } else {
          selectExamOption(activeQ.id, letter);
        }
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (activeIdx < interactiveDeck.length - 1) setActiveIdx(activeIdx + 1);
      } else if (e.key === 'ArrowLeft') {
        if (activeIdx > 0) setActiveIdx(activeIdx - 1);
      } else if (k === 'F') {
        onToggleFlag(activeQ.id);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [
    viewMode,
    currentPracticeQ,
    currentExamQ,
    safePracticeIdx,
    safeExamIdx,
    interactiveDeck.length,
    examSubmitted,
    selectPracticeOption,
    selectExamOption,
    onToggleFlag,
  ]);

  // Quick Overview answer visibility counters & global toggle
  const visibleOverviewCount = useMemo(
    () => overviewList.filter((q) => !hiddenOverviewIds[q.id]).length,
    [overviewList, hiddenOverviewIds]
  );

  const allOverviewAnswersShown = overviewList.length > 0 && visibleOverviewCount === overviewList.length;

  const handleToggleAllOverviewAnswers = () => {
    if (visibleOverviewCount > 0) {
      // Hide all currently listed questions
      const next: Record<number, boolean> = { ...hiddenOverviewIds };
      overviewList.forEach((q) => {
        next[q.id] = true;
      });
      setHiddenOverviewIds(next);
    } else {
      // Reveal all currently listed questions
      const next: Record<number, boolean> = { ...hiddenOverviewIds };
      overviewList.forEach((q) => {
        delete next[q.id];
      });
      setHiddenOverviewIds(next);
    }
  };

  const toggleSingleOverviewAnswer = (id: number) => {
    setHiddenOverviewIds((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return next;
    });
  };

  // Practice statistics
  const practiceStats = useMemo(() => {
    let attempted = 0;
    let correct = 0;
    interactiveDeck.forEach((q) => {
      if (practiceAnswers[q.id]) {
        attempted += 1;
        if (practiceAnswers[q.id] === q.answer) correct += 1;
      }
    });
    return { attempted, correct };
  }, [interactiveDeck, practiceAnswers]);

  // Exam scorecard metrics
  const examMetrics = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    const sectionMap: Record<string, { correct: number; total: number }> = {};

    interactiveDeck.forEach((q) => {
      if (!sectionMap[q.section]) sectionMap[q.section] = { correct: 0, total: 0 };
      sectionMap[q.section].total += 1;
      const picked = examAnswers[q.id];
      if (!picked) {
        unanswered += 1;
      } else if (picked === q.answer) {
        correct += 1;
        sectionMap[q.section].correct += 1;
      } else {
        wrong += 1;
      }
    });

    const pct = interactiveDeck.length > 0 ? Math.round((correct / interactiveDeck.length) * 100) : 0;
    const elapsed = Math.max(0, examTotalSeconds - examSecondsLeft);
    return { correct, wrong, unanswered, pct, elapsed, sectionMap };
  }, [interactiveDeck, examAnswers, examTotalSeconds, examSecondsLeft]);

  const filteredExamReviewList = useMemo(() => {
    return interactiveDeck.filter((q) => {
      const picked = examAnswers[q.id];
      const isRight = picked === q.answer;
      const isFlagged = state.mcq.flaggedIds.includes(q.id);
      if (examReviewFilter === 'correct') return isRight;
      if (examReviewFilter === 'wrong') return !isRight;
      if (examReviewFilter === 'flagged') return isFlagged;
      return true;
    });
  }, [interactiveDeck, examAnswers, examReviewFilter, state.mcq.flaggedIds]);

  const weakestSection = useMemo<{ name: string; pct: number } | null>(() => {
    let worst: { name: string; pct: number } | null = null;
    for (const [name, tot] of Object.entries(state.mcq.sectionTotal)) {
      if (!tot) continue;
      const pct = Math.round(((state.mcq.sectionCorrect[name] || 0) / tot) * 100);
      if (!worst || pct < worst.pct) worst = { name, pct };
    }
    return worst;
  }, [state.mcq.sectionCorrect, state.mcq.sectionTotal]);

  const handleCopyExamResults = async () => {
    const lines = [
      `CSE 3100 MCQ Exam Score: ${examMetrics.correct}/${interactiveDeck.length} (${examMetrics.pct}%)`,
      `Time Taken: ${formatTimer(examMetrics.elapsed)}`,
      '',
      ...interactiveDeck.map((q) => {
        const picked = examAnswers[q.id] || '—';
        const mark = picked === q.answer ? '✓' : '✗';
        return `Q${q.id} [${mark}] Picked: ${picked} | Correct: ${q.answer}`;
      }),
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 1800);
    } catch {
      // Ignore clipboard restrictions
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Hero Card with Mode Selector */}
      <section className="portal-card rounded-2xl p-5 sm:p-7 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] text-xs font-semibold tabular-nums">
              Complete CSE 3100 Review · {MCQ_BANK.length} Questions
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)]">
              Flutter &amp; Dart MCQ Practice &amp; Exam Review
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-3xl">
              Flutter setup, widgets &amp; state, layouts &amp; navigation, REST APIs &amp; HTTP, maps, Git, and project practice.
            </p>
          </div>

          {state.mcq.attempts > 0 && (
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)] pt-1">
              {state.mcq.bestScore !== null && (
                <span>
                  Best:{' '}
                  <strong className="text-[var(--success)] tabular-nums">
                    {state.mcq.bestScore}/{state.mcq.bestTotal}
                  </strong>
                </span>
              )}
              <span>
                Attempts: <strong className="text-[var(--text)] tabular-nums">{state.mcq.attempts}</strong>
              </span>
              {weakestSection && (
                <span className="text-[var(--warning)]">
                  Focus: <strong>{weakestSection.name} ({weakestSection.pct}%)</strong>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Three Distinct Mode Cards */}
        <div className="no-print grid grid-cols-1 md:grid-cols-3 gap-3.5" role="tablist" aria-label="MCQ study modes">
          {[
            {
              id: 'overview' as McqViewMode,
              title: 'Quick Overview (Read All)',
              icon: ListChecks,
              desc: 'Every question with its options and answers, all expanded. Hide or reveal answers per question or all at once.',
            },
            {
              id: 'practice' as McqViewMode,
              title: 'Practice Mode (Instant Feedback)',
              icon: BookOpen,
              desc: 'One question at a time. The correct answer and explanation appear as soon as you pick an option.',
            },
            {
              id: 'exam' as McqViewMode,
              title: 'Exam Mode (Submit at End)',
              icon: Clock,
              desc: 'Timed test with hidden answers during the attempt. Flag doubtful items, then submit for a full scorecard.',
            },
          ].map((m) => {
            const Icon = m.icon;
            const active = viewMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => switchMode(m.id)}
                className={`text-left rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between gap-2 ${
                  active
                    ? 'border-[var(--primary)] ring-1 ring-[var(--primary)]/30 bg-[var(--surface)] shadow-xs'
                    : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`flex items-center gap-2 text-sm font-bold leading-snug ${
                      active ? 'text-[var(--primary)]' : 'text-[var(--text)]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{m.title}</span>
                  </div>
                  {active && (
                    <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                  )}
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{m.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Filter by Section Card */}
      <section className="no-print portal-card rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Filter by Section
          </span>

          {/* Extra Deck Options shown cleanly in Practice & Exam Modes */}
          {viewMode !== 'overview' && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-[var(--text-muted)] font-medium mr-1">Length:</span>
                {([10, 25, 50, 100] as const).map((len) => (
                  <button
                    key={len}
                    type="button"
                    disabled={viewMode === 'exam' && !examSubmitted && Object.keys(examAnswers).length > 0}
                    onClick={() => {
                      setLengthLimit(len);
                      setPracticeIdx(0);
                      setExamIdx(0);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-mono font-semibold border transition-colors disabled:opacity-45 ${
                      lengthLimit === len
                        ? 'bg-[var(--primary-soft)] text-[var(--primary)] border-[var(--primary)]'
                        : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    {len === 100 ? 'All' : len}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={viewMode === 'exam' && !examSubmitted && Object.keys(examAnswers).length > 0}
                onClick={() => {
                  setShuffleQuestions((s) => !s);
                  setShuffleSeed((n) => n + 1);
                  setPracticeIdx(0);
                  setExamIdx(0);
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border font-semibold transition-colors disabled:opacity-45 ${
                  shuffleQuestions
                    ? 'bg-[var(--primary-soft)] text-[var(--primary)] border-[var(--primary)]'
                    : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                <Shuffle className="w-3.5 h-3.5" />
                {shuffleQuestions ? 'Shuffled' : 'Ordered'}
              </button>

              {state.mcq.lastWrongIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setRetryWrongOnly((r) => !r);
                    setPracticeIdx(0);
                    if (viewMode === 'exam') resetExamSession();
                  }}
                  className={`px-2.5 py-1 rounded-lg border font-semibold transition-colors ${
                    retryWrongOnly
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'border-amber-500/40 bg-[var(--state-warn)] text-[var(--warning)]'
                  }`}
                >
                  Retry wrong ({state.mcq.lastWrongIds.length})
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setSectionFilter('all');
              setPracticeIdx(0);
              setExamIdx(0);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors tabular-nums ${
              sectionFilter === 'all'
                ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-xs'
                : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--primary)]/50 hover:text-[var(--text)]'
            }`}
          >
            All ({MCQ_BANK.length})
          </button>

          {MCQ_SECTIONS.map((sec) => {
            const count = SECTION_COUNTS[sec.name] || 0;
            const active = sectionFilter === sec.name;
            return (
              <button
                key={sec.name}
                type="button"
                onClick={() => {
                  setSectionFilter(sec.name);
                  setPracticeIdx(0);
                  setExamIdx(0);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors tabular-nums ${
                  active
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-xs'
                    : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--primary)]/50 hover:text-[var(--text)]'
                }`}
              >
                {sec.name} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          MODE 1: QUICK OVERVIEW MODE (DEFAULT)
          ===================================================================== */}
      {viewMode === 'overview' && (
        <div className="space-y-4">
          {/* Search + Global Hide/Show Answers Bar */}
          <div className="no-print portal-card rounded-2xl p-3.5 sm:px-5 sm:py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={overviewSearch}
                onChange={(e) => setOverviewSearch(e.target.value)}
                placeholder="Search questions, Dart code, options or explanations..."
                aria-label="Search MCQs"
                className="w-full h-10 pl-10 pr-9 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
              />
              {overviewSearch && (
                <button
                  type="button"
                  onClick={() => setOverviewSearch('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs sm:text-sm text-[var(--text-muted)] tabular-nums">
                {visibleOverviewCount}/{overviewList.length} answers shown
              </span>

              <button
                type="button"
                onClick={handleToggleAllOverviewAnswers}
                disabled={overviewList.length === 0}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] text-xs font-bold text-[var(--text)] transition-colors disabled:opacity-40"
              >
                {allOverviewAnswersShown || visibleOverviewCount > 0 ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    Hide all answers
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    Show all answers
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                aria-label="Print question bank"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print
              </button>
            </div>
          </div>

          {/* All Questions Scrollable Stack */}
          {overviewList.length === 0 ? (
            <div className="portal-card rounded-2xl p-10 text-center space-y-3">
              <p className="text-sm font-medium text-[var(--text-muted)]">
                No questions match "{overviewSearch}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setOverviewSearch('');
                  setSectionFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {overviewList.map((item) => {
                const isHidden = Boolean(hiddenOverviewIds[item.id]);
                const weekLabel = SECTION_WEEK_MAP[item.section] || 'Course';
                const bookmarked = isBookmarked(`mcq-${item.id}`);

                return (
                  <article
                    key={item.id}
                    className="portal-card rounded-2xl p-5 sm:p-6 space-y-4 print-break-inside-avoid"
                  >
                    {/* Top Meta + Hide/Show Answer Pill */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded-md bg-[var(--primary-soft)] text-[var(--primary)] font-mono font-bold tabular-nums">
                          Q{item.id}
                        </span>
                        <span className="font-bold text-[var(--text)]">{item.section}</span>
                        <span className="text-[var(--text-muted)]">· {weekLabel}</span>
                      </div>

                      <div className="no-print flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onToggleBookmark({
                              id: `mcq-${item.id}`,
                              kind: 'mcq',
                              title: `Q${item.id}: ${item.q}`,
                              subtitle: item.section,
                              route: '/mcq',
                            })
                          }
                          aria-label={`Bookmark Q${item.id}`}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            bookmarked
                              ? 'border-amber-400 bg-amber-500/15 text-amber-600 dark:text-amber-300'
                              : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                          }`}
                        >
                          <Bookmark
                            className="w-3.5 h-3.5"
                            fill={bookmarked ? 'currentColor' : 'none'}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleSingleOverviewAnswer(item.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
                            !isHidden
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/70 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                              : 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--text)]'
                          }`}
                        >
                          {!isHidden ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              Hide answer
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              Show answer
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Question Stem */}
                    <h2 className="text-[15px] sm:text-base font-bold text-[var(--text)] leading-snug">
                      {item.q}
                    </h2>

                    {/* 2x2 Options Grid — Exact A-D Order (NEVER shuffled) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {item.options.map((opt, idx) => {
                        const letter = LETTERS[idx];
                        const isCorrectOpt = !isHidden && item.answer === letter;
                        return (
                          <div
                            key={letter}
                            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-sm transition-colors ${
                              isCorrectOpt
                                ? 'border-emerald-500 bg-emerald-50/75 text-emerald-900 font-semibold dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-200'
                                : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)]'
                            }`}
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              <span
                                className={`font-mono font-bold shrink-0 ${
                                  isCorrectOpt
                                    ? 'text-emerald-700 dark:text-emerald-300'
                                    : 'text-[var(--text-muted)]'
                                }`}
                              >
                                {letter})
                              </span>
                              <span className="break-words">{opt}</span>
                            </div>
                            {isCorrectOpt && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Strip */}
                    {!isHidden && (
                      <div className="rounded-xl bg-[var(--surface-2)]/70 border border-[var(--border)] px-4 py-3 text-xs sm:text-sm text-[var(--text-muted)]">
                        <strong className="text-emerald-600 dark:text-emerald-400 font-bold mr-1.5">
                          Answer: {item.answer}
                        </strong>
                        <span className="mr-1.5">·</span>
                        <span>{item.explain}</span>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          MODE 2: PRACTICE MODE (SELF-PACED, INSTANT FEEDBACK)
          ===================================================================== */}
      {viewMode === 'practice' && (
        <div className="space-y-5">
          {/* Practice Score & Progress Bar */}
          <div className="no-print portal-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-semibold text-[var(--text)] tabular-nums">
                Progress:{' '}
                <strong className="font-mono text-[var(--primary)]">
                  {practiceStats.attempted}/{interactiveDeck.length}
                </strong>
              </span>
              <span className="font-semibold text-[var(--text)] tabular-nums">
                Correct:{' '}
                <strong className="font-mono text-[var(--success)]">
                  {practiceStats.correct}
                  {practiceStats.attempted > 0
                    ? ` (${Math.round((practiceStats.correct / practiceStats.attempted) * 100)}%)`
                    : ''}
                </strong>
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setPracticeAnswers({});
                setPracticeRevealed({});
                setPracticeIdx(0);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Practice
            </button>
          </div>

          {currentPracticeQ ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Active Practice Question */}
              <div className="lg:col-span-8 portal-card rounded-2xl p-5 sm:p-7 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-[var(--primary-soft)] text-[var(--primary)] font-mono font-bold tabular-nums">
                      Q{currentPracticeQ.id}
                    </span>
                    <span className="font-bold text-[var(--text)]">{currentPracticeQ.section}</span>
                    <span className="text-[var(--text-muted)]">
                      · #{safePracticeIdx + 1} of {interactiveDeck.length}
                    </span>
                  </div>

                  <div className="no-print flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onToggleFlag(currentPracticeQ.id)}
                      aria-label="Flag question"
                      className={`p-2 rounded-lg border text-xs ${
                        state.mcq.flaggedIds.includes(currentPracticeQ.id)
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
                          id: `mcq-${currentPracticeQ.id}`,
                          kind: 'mcq',
                          title: `Q${currentPracticeQ.id}: ${currentPracticeQ.q}`,
                          subtitle: currentPracticeQ.section,
                          route: '/mcq',
                        })
                      }
                      aria-label="Bookmark question"
                      className={`p-2 rounded-lg border text-xs ${
                        isBookmarked(`mcq-${currentPracticeQ.id}`)
                          ? 'border-amber-400 bg-amber-500/15 text-amber-600 dark:text-amber-300'
                          : 'border-[var(--border)] text-[var(--text-muted)]'
                      }`}
                    >
                      <Bookmark
                        className="w-3.5 h-3.5"
                        fill={isBookmarked(`mcq-${currentPracticeQ.id}`) ? 'currentColor' : 'none'}
                      />
                    </button>
                    <a
                      href={`mailto:trofder@baust.edu.bd?subject=${encodeURIComponent(
                        `CSE 3100 MCQ Q${currentPracticeQ.id} Issue Report`
                      )}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Report</span>
                    </a>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] leading-snug">
                  {currentPracticeQ.q}
                </h2>

                {/* Options (NEVER shuffled) */}
                <div
                  role="radiogroup"
                  aria-label={`Practice options for Question ${currentPracticeQ.id}`}
                  className="space-y-2.5"
                >
                  {currentPracticeQ.options.map((opt, idx) => {
                    const letter = LETTERS[idx];
                    const picked = practiceAnswers[currentPracticeQ.id] === letter;
                    const isRevealed = Boolean(practiceRevealed[currentPracticeQ.id]);
                    const isCorrectOpt = currentPracticeQ.answer === letter;

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
                        onClick={() => selectPracticeOption(currentPracticeQ.id, letter)}
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

                {/* Immediate Explanation */}
                {practiceRevealed[currentPracticeQ.id] && (
                  <div
                    aria-live="polite"
                    className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/70 px-4 py-3 text-xs sm:text-sm text-[var(--text-muted)]"
                  >
                    <strong className="text-emerald-600 dark:text-emerald-400 font-bold mr-1.5">
                      Answer: {currentPracticeQ.answer}
                    </strong>
                    <span className="mr-1.5">·</span>
                    <span>{currentPracticeQ.explain}</span>
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="no-print pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={safePracticeIdx === 0}
                      onClick={() => setPracticeIdx((i) => Math.max(0, i - 1))}
                      className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>
                    <button
                      type="button"
                      disabled={safePracticeIdx >= interactiveDeck.length - 1}
                      onClick={() =>
                        setPracticeIdx((i) => Math.min(interactiveDeck.length - 1, i + 1))
                      }
                      className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold disabled:opacity-40"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {!practiceRevealed[currentPracticeQ.id] && (
                    <button
                      type="button"
                      onClick={() =>
                        setPracticeRevealed((p) => ({ ...p, [currentPracticeQ.id]: true }))
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold hover:border-[var(--primary)]"
                    >
                      <Eye className="w-3.5 h-3.5" /> Show answer
                    </button>
                  )}
                </div>
              </div>

              {/* Practice Question Navigator */}
              <aside className="no-print lg:col-span-4 portal-card rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--text)]">Question Navigator</span>
                  <span className="font-mono text-[var(--text-muted)] tabular-nums">
                    {practiceStats.attempted}/{interactiveDeck.length}
                  </span>
                </div>
                <div className="grid grid-cols-10 gap-1">
                  {interactiveDeck.map((q, idx) => {
                    const isCurr = idx === safePracticeIdx;
                    const answered = Boolean(practiceAnswers[q.id]);
                    const flagged = state.mcq.flaggedIds.includes(q.id);
                    const revealed = Boolean(practiceRevealed[q.id]);
                    const correct = practiceAnswers[q.id] === q.answer;

                    let cellCls =
                      'border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-muted)]';
                    if (revealed && answered) {
                      cellCls = correct
                        ? 'border-emerald-500 bg-[var(--state-ok)] text-[var(--success)] font-bold'
                        : 'border-red-500 bg-[var(--state-bad)] text-[var(--danger)] font-bold';
                    } else if (revealed) {
                      cellCls =
                        'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)] font-bold';
                    }

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setPracticeIdx(idx)}
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
                  Keys: A–D / 1–4 pick · F flag · ← / → / Enter navigate
                </div>
              </aside>
            </div>
          ) : (
            <div className="portal-card rounded-2xl p-8 text-center text-sm text-[var(--text-muted)]">
              No questions match the current filters.
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          MODE 3: EXAM MODE (TIMED ATTEMPT + HIDDEN ANSWERS + SCORECARD)
          ===================================================================== */}
      {viewMode === 'exam' && (
        <div className="space-y-5">
          {/* Exam Timer & Submit Bar */}
          {!examSubmitted && (
            <div className="no-print portal-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border font-mono text-sm font-bold tabular-nums ${
                    examSecondsLeft <= 60
                      ? 'border-red-500 bg-[var(--state-bad)] text-[var(--danger)]'
                      : examSecondsLeft <= examTotalSeconds * 0.2
                      ? 'border-amber-500 bg-[var(--state-warn)] text-[var(--warning)]'
                      : 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)]'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>{formatTimer(examSecondsLeft)}</span>
                  {examPaused && <span className="text-[11px] uppercase ml-1">(Paused)</span>}
                </div>

                <button
                  type="button"
                  onClick={() => setExamPaused((p) => !p)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--text)] hover:border-[var(--primary)]"
                >
                  {examPaused ? (
                    <>
                      <Play className="w-3.5 h-3.5" /> Resume
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pause
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => resetExamSession()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Restart Exam
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono text-[var(--text-muted)] tabular-nums">
                  Answered:{' '}
                  <strong className="text-[var(--text)]">
                    {Object.keys(examAnswers).length}/{interactiveDeck.length}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={handleSubmitExam}
                  disabled={interactiveDeck.length === 0}
                  className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:opacity-90 disabled:opacity-40"
                >
                  Submit Exam
                </button>
              </div>
            </div>
          )}

          {/* Active Exam Attempt (Answers Strictly Hidden) */}
          {!examSubmitted ? (
            currentExamQ ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 portal-card rounded-2xl p-5 sm:p-7 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-[var(--primary-soft)] text-[var(--primary)] font-mono font-bold tabular-nums">
                        Q{currentExamQ.id}
                      </span>
                      <span className="font-bold text-[var(--text)]">{currentExamQ.section}</span>
                      <span className="text-[var(--text-muted)]">
                        · #{safeExamIdx + 1} of {interactiveDeck.length}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleFlag(currentExamQ.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                        state.mcq.flaggedIds.includes(currentExamQ.id)
                          ? 'border-amber-400 bg-amber-500/15 text-amber-600 dark:text-amber-300'
                          : 'border-[var(--border)] text-[var(--text-muted)]'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      {state.mcq.flaggedIds.includes(currentExamQ.id) ? 'Flagged' : 'Flag'}
                    </button>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] leading-snug">
                    {currentExamQ.q}
                  </h2>

                  <div
                    role="radiogroup"
                    aria-label={`Exam options for Question ${currentExamQ.id}`}
                    className="space-y-2.5"
                  >
                    {currentExamQ.options.map((opt, idx) => {
                      const letter = LETTERS[idx];
                      const picked = examAnswers[currentExamQ.id] === letter;
                      return (
                        <button
                          key={letter}
                          type="button"
                          role="radio"
                          aria-checked={picked}
                          onClick={() => selectExamOption(currentExamQ.id, letter)}
                          className={`w-full min-h-[48px] flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-colors ${
                            picked
                              ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)] font-semibold'
                              : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] text-[var(--text)]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="font-mono font-bold shrink-0">{letter})</span>
                            <span>{opt}</span>
                          </div>
                          {picked && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="no-print pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={safeExamIdx === 0}
                        onClick={() => setExamIdx((i) => Math.max(0, i - 1))}
                        className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold disabled:opacity-40"
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous
                      </button>
                      <button
                        type="button"
                        disabled={safeExamIdx >= interactiveDeck.length - 1}
                        onClick={() =>
                          setExamIdx((i) => Math.min(interactiveDeck.length - 1, i + 1))
                        }
                        className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold disabled:opacity-40"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmitExam}
                      className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:opacity-90"
                    >
                      Submit Exam ({Object.keys(examAnswers).length}/{interactiveDeck.length})
                    </button>
                  </div>
                </div>

                {/* Exam Navigator */}
                <aside className="no-print lg:col-span-4 portal-card rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--text)]">Exam Navigator</span>
                    <span className="font-mono text-[var(--text-muted)] tabular-nums">
                      {Object.keys(examAnswers).length}/{interactiveDeck.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-10 gap-1">
                    {interactiveDeck.map((q, idx) => {
                      const isCurr = idx === safeExamIdx;
                      const answered = Boolean(examAnswers[q.id]);
                      const flagged = state.mcq.flaggedIds.includes(q.id);

                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => setExamIdx(idx)}
                          title={`Q${q.id}`}
                          className={`relative h-7 rounded-md border font-mono text-[10px] tabular-nums flex items-center justify-center ${
                            answered
                              ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)] font-bold'
                              : 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-muted)]'
                          } ${isCurr ? 'ring-2 ring-[var(--primary)]' : ''}`}
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
                    Answers stay hidden until you submit. Keys: A–D · F flag · ← / →
                  </div>
                </aside>
              </div>
            ) : (
              <div className="portal-card rounded-2xl p-8 text-center text-sm text-[var(--text-muted)]">
                No questions match the current filters.
              </div>
            )
          ) : (
            /* Final Exam Scorecard + Full Question-by-Question Review */
            <div className="space-y-6">
              <section className="portal-card rounded-2xl p-6 sm:p-7 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-[var(--primary)]">
                      <Award className="w-4 h-4" />
                      Exam Scorecard &amp; Review
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tabular-nums text-[var(--text)]">
                      {examMetrics.correct} / {interactiveDeck.length} ({examMetrics.pct}%)
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[var(--text-muted)] tabular-nums">
                      <span className="text-[var(--success)] font-semibold">
                        Correct: {examMetrics.correct}
                      </span>
                      <span>·</span>
                      <span className="text-[var(--danger)] font-semibold">
                        Incorrect: {examMetrics.wrong}
                      </span>
                      <span>·</span>
                      <span>Unanswered: {examMetrics.unanswered}</span>
                      <span>·</span>
                      <span className="font-mono">Time: {formatTimer(examMetrics.elapsed)}</span>
                    </div>
                  </div>

                  <div className="no-print flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyExamResults}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold"
                    >
                      {copiedSummary ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedSummary ? 'Copied' : 'Copy Results'}
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print
                    </button>
                    <button
                      type="button"
                      onClick={() => resetExamSession()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retake Exam
                    </button>
                  </div>
                </div>

                {/* Section Breakdown Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {Object.entries(examMetrics.sectionMap).map(([sec, val]) => {
                    const secPct = val.total > 0 ? Math.round((val.correct / val.total) * 100) : 0;
                    return (
                      <div
                        key={sec}
                        className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 space-y-2"
                      >
                        <div className="text-xs font-bold text-[var(--text)] truncate" title={sec}>
                          {sec}
                        </div>
                        <div className="flex items-baseline justify-between font-mono text-sm font-bold tabular-nums">
                          <span className="text-[var(--primary)]">
                            {val.correct}/{val.total}
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">{secPct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[var(--surface-2)] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[var(--primary)]"
                            style={{ width: `${secPct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Review Filter Bar */}
              <div className="no-print flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-base font-bold text-[var(--text)]">
                  Question-by-Question Review ({filteredExamReviewList.length})
                </h3>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {(
                    [
                      { id: 'all', label: `All (${interactiveDeck.length})` },
                      {
                        id: 'wrong',
                        label: `Incorrect / Missed (${examMetrics.wrong + examMetrics.unanswered})`,
                      },
                      {
                        id: 'flagged',
                        label: `Flagged (${
                          interactiveDeck.filter((q) => state.mcq.flaggedIds.includes(q.id)).length
                        })`,
                      },
                      { id: 'correct', label: `Correct (${examMetrics.correct})` },
                    ] as { id: ReviewFilter; label: string }[]
                  ).map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setExamReviewFilter(f.id)}
                      className={`px-3 py-1.5 rounded-full font-semibold border transition-colors ${
                        examReviewFilter === f.id
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                          : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exam Review Cards */}
              <div className="space-y-4">
                {filteredExamReviewList.map((item) => {
                  const picked = examAnswers[item.id];
                  const isCorrect = picked === item.answer;
                  const weekLabel = SECTION_WEEK_MAP[item.section] || 'Course';

                  return (
                    <article
                      key={item.id}
                      className="portal-card rounded-2xl p-5 sm:p-6 space-y-4 print-break-inside-avoid"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="px-2 py-0.5 rounded-md bg-[var(--primary-soft)] text-[var(--primary)] font-mono font-bold tabular-nums">
                            Q{item.id}
                          </span>
                          <span className="font-bold text-[var(--text)]">{item.section}</span>
                          <span className="text-[var(--text-muted)]">· {weekLabel}</span>
                        </div>

                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--state-ok)] text-[var(--success)] text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : picked ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--state-bad)] text-[var(--danger)] text-xs font-bold">
                            <XCircle className="w-3.5 h-3.5" /> Your answer: {picked}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--surface-2)] text-[var(--text-muted)] text-xs font-bold">
                            Unanswered
                          </span>
                        )}
                      </div>

                      <h4 className="text-[15px] sm:text-base font-bold text-[var(--text)] leading-snug">
                        {item.q}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {item.options.map((opt, idx) => {
                          const letter = LETTERS[idx];
                          const isAns = item.answer === letter;
                          const isUserPick = picked === letter;

                          let cls = 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)]';
                          if (isAns) {
                            cls =
                              'border-emerald-500 bg-emerald-50/75 text-emerald-900 font-semibold dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-200';
                          } else if (isUserPick && !isAns) {
                            cls =
                              'border-red-500 bg-[var(--state-bad)] text-[var(--danger)] font-medium';
                          }

                          return (
                            <div
                              key={letter}
                              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-sm ${cls}`}
                            >
                              <div className="flex items-start gap-2.5">
                                <span className="font-mono font-bold shrink-0">{letter})</span>
                                <span>{opt}</span>
                              </div>
                              {isAns && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                              {isUserPick && !isAns && <XCircle className="w-4 h-4 shrink-0" />}
                            </div>
                          );
                        })}
                      </div>

                      <div className="rounded-xl bg-[var(--surface-2)]/70 border border-[var(--border)] px-4 py-3 text-xs sm:text-sm text-[var(--text-muted)]">
                        <strong className="text-emerald-600 dark:text-emerald-400 font-bold mr-1.5">
                          Answer: {item.answer}
                        </strong>
                        <span className="mr-1.5">·</span>
                        <span>{item.explain}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
